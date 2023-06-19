using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Enumerations;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Requests.Specifications;
using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Images.BaseModel;
using ShopHeaven.Models.Responses.Products;
using ShopHeaven.Models.Responses.Products.BaseModel;
using ShopHeaven.Models.Responses.Specifications;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Data.Services
{
    public class ProductsService : IProductsService
    {
        private readonly ShopDbContext db;
        private readonly IStorageService storageService;
        private readonly IUsersService usersService;

        public ProductsService(ShopDbContext db,
            IStorageService storageService,
            IUsersService usersService)
        {
            this.db = db;
            this.storageService = storageService;
            this.usersService = usersService;
        }

        public async Task<AdminProductResponseModel> CreateProductAsync(CreateProductRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.CreatedBy);

            var subcategory = await this.db.SubCategories
                .Include(x => x.MainCategory)
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new NullReferenceException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            if (model.Name.Trim().Length < 2)
            {
                throw new ArgumentException(GlobalConstants.ProductNameNotEnoughLength);
            }

            if (model.Description.Trim().Length < 5)
            {
                throw new ArgumentException(GlobalConstants.ProductDescriptionNotEnoughLength);
            }

            if (model.Price < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductPriceCannotBeNegativeNumber);
            }

            if (model.Discount < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductDiscountCannotBeNegativeNumber);
            }

            if (model.Quantity < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductQuantityCannotBeNegativeNumber);
            }

            if (model.Tags == null || model.Tags.Count < 1)
            {
                throw new ArgumentException(GlobalConstants.ProductMustContainAtLeast1Tag);
            }

            if (model.Specifications == null)
            {
                model.Specifications = new List<CreateSpecificationRequestModel>();
            }

            if (model.Labels == null)
            {
                model.Labels = new List<string>();
            }

            var newProduct = new Models.Product();

            //get tags from database, or create it without saving DB
            var filteredTags = model.Tags.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var tags = await GetTagsAsync(filteredTags, user.Id);

            //create mapping objects for every tag
            await CreateProductTagsAsync(tags, newProduct.Id);

            // get labels from database, or create it without saving DB
            var filteredLabels = new List<string>();

            if (model.Labels.Count > 0)
            {
                filteredLabels = model.Labels.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            }

            var labels = await GetLabelsAsync(model.Labels);

            //create mapping objects for every label
            await CreateProductLabelAsync(labels, newProduct.Id);

            //create new records for every image
            var images = await CreateImagesAsync(model.Images, user.Id);

            //create productImage record for every image
            var productImages = await CreateProductImagesAsync(images, newProduct.Id);

            List<Specification> specifications = model.Specifications.Select(x => new Specification
            {
                ProductId = newProduct.Id,
                Key = x.Key.Trim(),
                Value = x.Value.Trim(),
            })
                .ToList();

            newProduct.CreatedById = user.Id;
            newProduct.Name = model.Name.Trim();
            newProduct.Description = model.Description.Trim();
            newProduct.Brand = model.Brand != null ? model.Brand.Trim() : "";
            newProduct.SubCategoryId = subcategory.Id;
            newProduct.Discount = model.Discount;
            newProduct.Price = model.Price;
            newProduct.HasGuarantee = model.HasGuarantee;
            newProduct.Quantity = model.Quantity;
            newProduct.Specifications = specifications;

            await this.db.Products.AddAsync(newProduct);
            await this.db.SaveChangesAsync();

            bool isProductInUserWishlist = await IsProductInUserWishlistAsync(newProduct, user);

            var createdProduct = new AdminProductResponseModel()
            {
                Id = newProduct.Id,
                Brand = newProduct.Brand,
                Name = newProduct.Name,
                Description = newProduct.Description,
                CategoryId = subcategory.MainCategory.Id,
                CategoryName = subcategory.MainCategory.Name,
                SubcategoryId = subcategory.Id,
                SubcategoryName = subcategory.Name,
                Price = newProduct.Price,
                Discount = newProduct.Discount,
                Quantity = newProduct.Quantity,
                IsAvailable = newProduct.IsAvailable,
                Rating = newProduct.Rating,
                HasGuarantee = newProduct.HasGuarantee,
                IsInUserWishlist = isProductInUserWishlist,
                ReviewsCount = newProduct.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Count(),
                CreatedBy = user.Email,
                Images = productImages
                    .Where(x => x.IsDeleted != true)
                    .Select(x => new BasicImageResponseModel
                    {
                        Url = x.Image.Url,
                        IsThumbnail = x.IsThumbnail
                    })
                    .ToList(),
                Labels = labels
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Content)
                    .ToList(),
                Tags = tags
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Name)
                    .ToList(),
                Specifications = specifications
                    .Where(x => x.IsDeleted != true)
                    .Select(x => new SpecificationResponseModel
                    {
                        Id = x.Id,
                        Key = x.Key,
                        Value = x.Value
                    })
                    .ToList(),
            };

            return createdProduct;
        }

        public async Task<AdminProductResponseModel> EditProductAsync(EditProductRequestModel model)
        {
            var product = await this.db.Products
                .Include(x => x.Specifications
                    .Where(s => s.IsDeleted != true))
                .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            var user = await this.usersService.GetUserAsync(model.CreatedBy);

            var subcategory = await this.db.SubCategories
                .Include(x => x.MainCategory)
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new NullReferenceException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            if (model.Name.Trim().Length < 2)
            {
                throw new ArgumentException(GlobalConstants.ProductNameNotEnoughLength);
            }

            if (model.Description.Trim().Length < 5)
            {
                throw new ArgumentException(GlobalConstants.ProductDescriptionNotEnoughLength);
            }

            if (model.Price < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductPriceCannotBeNegativeNumber);
            }

            if (model.Discount < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductDiscountCannotBeNegativeNumber);
            }

            if (model.Quantity < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductQuantityCannotBeNegativeNumber);
            }

            if (model.Tags == null || model.Tags.Count < 1)
            {
                throw new ArgumentException(GlobalConstants.ProductMustContainAtLeast1Tag);
            }

            if (model.Specifications == null)
            {
                model.Specifications = new List<EditSpecificationRequestModel>();
            }

            if (model.Labels == null)
            {
                model.Labels = new List<string>();
            }

            if (model.Images == null)
            {
                model.Images = new List<IFormFile>();
            }

            //get tags from database, or create it without saving DB
            var filteredTags = model.Tags.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var tags = await GetTagsAsync(filteredTags, user.Id);

            //create mapping objects for every tag
            var productTags = await CreateProductTagsAsync(tags, product.Id);

            // get labels from database, or create it without saving DB
            var filteredLabels = new List<string>();

            if (model.Labels.Count > 0)
            {
                filteredLabels = model.Labels.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            }

            var labels = await GetLabelsAsync(model.Labels);

            //create mapping objects for every label
            var productLabels = await CreateProductLabelAsync(labels, product.Id);

            //create new records for every image
            var images = await CreateImagesAsync(model.Images, user.Id);

            //create productImage record for every image
            var productImages = await CreateProductImagesAsync(images, product.Id);

            List<Specification> specifications = model.Specifications.Select(x => new Specification
            {
                ProductId = product.Id,
                Key = x.Key.Trim(),
                Value = x.Value.Trim(),
            })
                .ToList();

            product.CreatedById = user.Id;
            product.ModifiedOn = DateTime.UtcNow;
            product.Name = model.Name.Trim();
            product.Description = model.Description.Trim();
            product.Brand = model.Brand != null ? model.Brand.Trim() : "";
            product.SubCategoryId = subcategory.Id;
            product.Discount = model.Discount;
            product.Price = model.Price;
            product.HasGuarantee = model.HasGuarantee;
            product.Quantity = model.Quantity;
            product.Specifications = specifications;

            await this.db.SaveChangesAsync();

            var allProductImages = await this.db.ProductsImages
                .Where(x => x.ProductId == product.Id && x.IsDeleted != true)
                .Select(x => new BasicImageResponseModel
                {
                    Url = x.Image.Url,
                    IsThumbnail = x.IsThumbnail
                })
                .ToListAsync();

            bool isProductInUserWishlist = await IsProductInUserWishlistAsync(product, user);

            var updatedProduct = new AdminProductResponseModel()
            {
                Id = product.Id,
                Brand = product.Brand,
                Name = product.Name,
                Description = product.Description,
                CategoryId = subcategory.MainCategory.Id,
                CategoryName = subcategory.MainCategory.Name,
                SubcategoryId = subcategory.Id,
                SubcategoryName = subcategory.Name,
                Price = product.Price,
                Discount = product.Discount,
                Quantity = product.Quantity,
                IsAvailable = product.IsAvailable,
                Rating = product.Rating,
                HasGuarantee = product.HasGuarantee,
                IsInUserWishlist = isProductInUserWishlist,
                ReviewsCount = product.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Count(),
                CreatedBy = user.Email,
                Images = allProductImages,
                Labels = labels
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Content)
                    .ToList(),
                Tags = tags
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Name)
                    .ToList(),
                Specifications = specifications
                    .Where(x => x.IsDeleted != true)
                    .Select(x => new SpecificationResponseModel
                    {
                        Id = x.Id,
                        Key = x.Key,
                        Value = x.Value
                    })
                    .ToList(),
            };

            return updatedProduct;
        }

        //product count by given criterias
        public async Task<int> GetProductsCount(AdminProductPaginationRequestModel model)
        {
            return await this.db.Products
                 .Where(p => (p.Name.ToLower().Contains(model.SearchTerm.Trim().ToLower())
                    || p.Brand.ToLower().Contains(model.SearchTerm.Trim().ToLower()))
                    && (model.CategoryId == ""
                            ? p.SubCategory.MainCategoryId != null
                            : p.SubCategory.MainCategoryId == model.CategoryId)
                    && p.IsDeleted != true)
                .CountAsync();
        }

        public async Task<ICollection<AdminProductResponseModel>> GetAllAsync(AdminProductPaginationRequestModel model)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId && x.IsDeleted != true);

            if (user == null) { user = new User(); }

            //select these product which contains search term in their name
            //also product is not deleted
            //and also if there is Category Id selected, filter products by this category
            //if categoryid is empty, dont filter by category

            //get requested sort criteria as enumeration type
            SortingCriteria sortingCriteria = ParseSortingCriteria(model.SortingCriteria);

            IQueryable<Models.Product> products = this.db.Products
            .Where(p => p.IsDeleted != true && (p.Name.ToLower().Contains(model.SearchTerm.Trim().ToLower())
             || p.Brand.ToLower().Contains(model.SearchTerm.Trim().ToLower()))
                    && (model.CategoryId == ""
                            ? p.SubCategory.MainCategoryId != null
                            : p.SubCategory.MainCategoryId == model.CategoryId));

            products = OrderBy(products, sortingCriteria);

            List<AdminProductResponseModel> orderedProducts = await products.Skip((model.Page - 1) * model.RecordsPerPage)
            .Take(model.RecordsPerPage)
            .Select(p => new AdminProductResponseModel
            {
                Id = p.Id,
                Name = p.Name,
                Brand = p.Brand,
                Description = p.Description,
                CategoryId = p.SubCategory.MainCategory.Id,
                CategoryName = p.SubCategory.MainCategory.Name,
                SubcategoryId = p.SubCategoryId,
                SubcategoryName = p.SubCategory.Name,
                CreatedBy = p.CreatedBy.Email,
                Price = p.Price,
                Discount = p.Discount,
                Quantity = p.Quantity,
                HasGuarantee = p.HasGuarantee,
                IsAvailable = p.IsAvailable,
                IsInUserWishlist = p.Wishlists.Any(pw => pw.ProductId == p.Id && pw.WishlistId == user.WishlistId),
                Rating = p.Rating,
                ReviewsCount = p.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Count(),
                Images = p.Images
                    .Where(x => x.IsDeleted != true)
                    .Select(x => new BasicImageResponseModel
                    {
                        Url = x.Image.Url,
                        IsThumbnail = x.IsThumbnail,
                    })
                    .ToList(),
                Tags = p.Tags
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Tag.Name)
                    .ToList(),
                Labels = p.Labels
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Label.Content)
                    .ToList(),
                Specifications = p.Specifications
                    .Where(x => x.IsDeleted != true)
                    .Select(x => new SpecificationResponseModel
                    {
                        Id = x.Id,
                        Key = x.Key,
                        Value = x.Value,
                    })
                    .ToList(),
            })
            .ToListAsync();


            return orderedProducts;
        }

        public async Task<ProductsBySubcategoryResponseModel> GetAllBySubcategoryIdAsync(ProductPaginationRequestModel model)
        {
            var subcategory = await this.db.SubCategories
                .Include(x => x.MainCategory)
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new ArgumentException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            var category = subcategory.MainCategory;

            var paginatedProducts = await GetProductsBySubcategoryIdAsync(model);

            var notPaginatedProducts = await this.db.Products
                .Where(p => p.SubCategoryId == model.SubcategoryId
                    && p.Price >= model.LowestPrice
                    && p.Price <= model.HighestPrice
                    && p.Rating >= model.Rating
                    && (p.Name.ToLower()
                              .Contains(model.SearchTerm.Trim().ToLower())
                            || p.Brand.ToLower()
                               .Contains(model.SearchTerm.Trim()
                               .ToLower()))
                    && p.IsDeleted != true)
                .ToListAsync();

            var notPaginatedProductsCount = notPaginatedProducts.
                Where(p =>
                    model.InStock == true
                    ? p.IsAvailable == true
                    : (p.IsAvailable == true || p.IsAvailable == false))
                .Count();

            var responseModel = new ProductsBySubcategoryResponseModel
            {
                Products = paginatedProducts,
                ProductsCount = notPaginatedProductsCount,
                PagesCount = (int)Math.Ceiling((double)notPaginatedProductsCount / model.RecordsPerPage),
                Category = new CategoryBaseResponseModel
                {
                    Id = category.Id,
                    Name = category.Name,
                },
                Subcategory = new SubcategoryBaseResponseModel
                {
                    Id = subcategory.Id,
                    Name = subcategory.Name,
                },
            };

            return responseModel;
        }

        public async Task<ICollection<GetProductByLabelsResponseModel>> GetProductsByLabelsAsync(GetProductsByLabelRequestModel model)
        {
            model.Labels = model.Labels.Select(x => x.Trim().ToLower()).ToList();

            var filteredProducts = new HashSet<Models.Product>();

            foreach (var label in model.Labels)
            {
                var productsByCurrentLabel = await this.db.Products
                    .Include(x => x.Images.Where(x => x.IsDeleted != true))
                    .ThenInclude(x => x.Image)
                    .Include(x => x.SubCategory)
                    .ThenInclude(x => x.MainCategory)
                    .Where(product => product.IsDeleted != true && product.Labels.Any(pl => pl.IsDeleted != true &&  pl.Label.Content.Trim().ToLower() == label))
                    .OrderByDescending(x => x.ModifiedOn)
                    .ToListAsync();

                filteredProducts.AddRange(productsByCurrentLabel);
            }

            List<GetProductByLabelsResponseModel> products = filteredProducts
                .Take(model.ProductsCount)
                .Select(product => new GetProductByLabelsResponseModel
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Image = product.Images
                    .Select(x => new BasicImageResponseModel
                    {
                        Url = x.Image.Url,
                        IsThumbnail = x.IsThumbnail
                    })
                    .FirstOrDefault(x => x.IsThumbnail) ?? new BasicImageResponseModel(),
                    Category = new CategoryBaseResponseModel
                    {
                        Id = product.SubCategory.MainCategoryId,
                        Name = product.SubCategory.MainCategory.Name,
                    },
                    Subcategory = new SubcategoryBaseResponseModel
                    {
                        Id = product.SubCategoryId,
                        Name = product.SubCategory.Name
                    }
                })
                .ToList();

            return products;
        }

        public async Task<ProductBaseResponseModel> DeleteProductAsync(DeleteProductRequestModel model, bool delete)
        {
            var productToDelete = await this.db.Products
                .Include(x => x.Reviews
                     .Where(x => x.IsDeleted != delete))
                .Include(x => x.Tags
                     .Where(x => x.IsDeleted != delete))
                .Include(x => x.Carts
                    .Where(x => x.IsDeleted != delete))
                .Include(x => x.Wishlists
                    .Where(x => x.IsDeleted != delete))
                .Include(x => x.Orders
                    .Where(x => x.IsDeleted != delete))
                .Include(x => x.Labels
                    .Where(x => x.IsDeleted != delete))
                .Include(x => x.Images
                    .Where(x => x.IsDeleted != delete))
                .Include(x => x.Specifications
                    .Where(x => x.IsDeleted != delete))
              .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != delete);

            if (productToDelete == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            var deletedReviews = 0;
            var deletedTags = 0;
            var deletedCarts = 0;
            var deletedWishlists = 0;
            var deletedOrders = 0;
            var deletedLabels = 0;
            var deletedImages = 0;
            var deletedSpecifications = 0;

            foreach (var review in productToDelete.Reviews.Where(x => x.IsDeleted != delete))
            {
                deletedReviews++;
                review.IsDeleted = delete;
            }

            foreach (var tag in productToDelete.Tags.Where(x => x.IsDeleted != delete))
            {
                deletedTags++;
                tag.IsDeleted = delete;
            }

            foreach (var cart in productToDelete.Carts.Where(x => x.IsDeleted != delete))
            {
                deletedCarts++;
                cart.IsDeleted = delete;
            }

            foreach (var wishlist in productToDelete.Wishlists.Where(x => x.IsDeleted != delete))
            {
                deletedWishlists++;
                wishlist.IsDeleted = delete;
            }

            foreach (var order in productToDelete.Orders.Where(x => x.IsDeleted != delete))
            {
                deletedOrders++;
                order.IsDeleted = delete;
            }

            foreach (var label in productToDelete.Labels.Where(x => x.IsDeleted != delete))
            {
                deletedLabels++;
                label.IsDeleted = delete;
            }

            foreach (var image in productToDelete.Images.Where(x => x.IsDeleted != delete))
            {
                deletedImages++;
                image.IsDeleted = delete;
            }

            foreach (var specification in productToDelete.Specifications.Where(x => x.IsDeleted != delete))
            {
                deletedSpecifications++;
                specification.IsDeleted = delete;
            }

            productToDelete.IsDeleted = delete;

            if (delete == true)
            {
                productToDelete.DeletedOn = DateTime.UtcNow;
            }
            else
            {
                productToDelete.DeletedOn = null;
            }

            ConfigureDeletionInfo(productToDelete, delete);

            await this.db.SaveChangesAsync();

            if (delete == true)
            {
                var responseModel = new DeleteProductResponseModel()
                {
                    Id = productToDelete.Id,
                    Name = productToDelete.Name,
                    DeletedCarts = deletedCarts,
                    DeletedImages = deletedImages,
                    DeletedLabels = deletedLabels,
                    DeletedOrders = deletedOrders,
                    DeletedReviews = deletedReviews,
                    DeletedSpecifications = deletedSpecifications,
                    DeletedTags = deletedTags,
                    DeletedWishlists = deletedWishlists
                };

                return responseModel;
            }

            else
            {
                var responseModel = new UndeleteProductResponseModel()
                {
                    Id = productToDelete.Id,
                    Name = productToDelete.Name,
                    RevealedCarts = deletedCarts,
                    RevealedImages = deletedImages,
                    RevealedLabels = deletedLabels,
                    RevealedOrders = deletedOrders,
                    RevealedReviews = deletedReviews,
                    RevealedSpecifications = deletedSpecifications,
                    RevealedTags = deletedTags,
                    RevealedWishlists = deletedWishlists
                };

                return responseModel;
            }
        }

        public async Task<List<ProductGalleryResponseModel>> GetSimilarProductsByProductIdAsync(ProductRequestModel model)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId && x.IsDeleted != true);
            if (user == null) { user = new User(); }

            return await this.db.Products
                .Where(p => p.IsDeleted != true)
                .Take(model.SimilarProductsCount)
                .Select(p => new ProductGalleryResponseModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Discount = p.Discount,
                   
                    Brand = p.Brand,
                    IsAvailable = p.IsAvailable,
                    Price = p.Price,
                    Rating = p.Rating,
                    IsInUserWishlist = p.Wishlists.Any(pw => pw.WishlistId == user.WishlistId && pw.ProductId == p.Id && pw.IsDeleted != true),
                    Labels = p.Labels
                        .Where(x => x.IsDeleted != true)
                        .Select(x => x.Label.Content)
                        .ToList(),
                    Image = p.Images
                            .FirstOrDefault(x => x.IsDeleted != true && x.IsThumbnail).Image.Url ?? p.Images.FirstOrDefault(x => x.IsDeleted != true).Image.Url
                })
                .ToListAsync();
        }

        public async Task<ProductResponseModel?> GetFullProductDataAsync(ProductRequestModel model)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId);

            if (user == null)
            {
                model.UserId = "";
            }

            var product = await this.db.Products
                            .Where(x => x.Id == model.Id && x.IsDeleted != true)
                            .Select(p => new ProductResponseModel
                            {
                                Id = p.Id,
                                Name = p.Name,
                                Brand = p.Brand,
                                Description = p.Description,
                                HasGuarantee = p.HasGuarantee,
                                isAvailable = p.IsAvailable,
                                Price = p.Price,
                                Discount = p.Discount,
                                Quantity = p.Quantity,
                                Rating = p.Rating,
                                ReviewsCount = p.Reviews
                                    .Where(x => x.IsDeleted != true)
                                    .Count(),
                                IsInUserCart = p.Carts
                                    .Any(x => x.ProductId == model.Id && x.Cart.UserId == model.UserId && x.IsDeleted != true),
                                IsInUserWishlist = p.Wishlists
                                    .Any(x => x.ProductId == model.Id && x.Wishlist.UserId == model.UserId && x.IsDeleted != true),
                                Category = new CategoryBaseResponseModel
                                {
                                    Id = p.SubCategory.MainCategoryId,
                                    Name = p.SubCategory.MainCategory.Name
                                },
                                Subcategory = new SubcategoryBaseResponseModel
                                {
                                    Id = p.SubCategoryId,
                                    Name = p.SubCategory.Name
                                },
                                Images = p.Images
                                    .Where(i => i.IsDeleted != true)
                                    .Select(i => new BasicImageResponseModel
                                    {
                                        Url = i.Image.Url,
                                        IsThumbnail = i.IsThumbnail
                                    })
                                    .ToList(),
                                Labels = p.Labels
                                    .Where(l => l.IsDeleted != true)
                                    .Select(l => l.Label.Content)
                                    .ToList(),
                                Tags = p.Tags
                                    .Where(t => t.IsDeleted != true)
                                    .Select(t => t.Tag.Name)
                                    .ToList(),
                                Specifications = p.Specifications
                                    .Where(s => s.IsDeleted != true)
                                    .Select(s => new SpecificationResponseModel
                                    {
                                        Id = s.Id,
                                        Key = s.Key,
                                        Value = s.Value,
                                    })
                                    .ToList()
                            })
                            .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            return product;
        }

        public async Task<Models.Product> GetProductAsync(string id)
        {
            var product = await this.db.Products.
                            FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            return product;
        }

        private void ConfigureDeletionInfo(Models.Product product, bool forDelete)
        {
            foreach (var review in product.Reviews.Where(x => x.IsDeleted == forDelete))
            {
                if (forDelete == true)
                {
                    review.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    review.DeletedOn = null;
                }
            }

            foreach (var tag in product.Tags.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    tag.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    tag.DeletedOn = null;
                }
            }

            foreach (var cart in product.Carts.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    cart.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    cart.DeletedOn = null;
                }
            }

            foreach (var wishlist in product.Wishlists.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    wishlist.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    wishlist.DeletedOn = null;
                }
            }

            foreach (var order in product.Orders.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    order.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    order.DeletedOn = null;
                }
            }

            foreach (var label in product.Labels.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    label.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    label.DeletedOn = null;
                }
            }

            foreach (var image in product.Images.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    image.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    image.DeletedOn = null;
                }
            }

            foreach (var specification in product.Specifications.Where(x => x.IsDeleted != forDelete))
            {
                if (forDelete == true)
                {
                    specification.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    specification.DeletedOn = null;
                }
            }

            if (forDelete == true)
            {
                product.DeletedOn = DateTime.UtcNow;
            }
            else
            {
                product.DeletedOn = null;
            }
        }

        private async Task<ICollection<Image>> CreateImagesAsync(ICollection<IFormFile> images, string userId)
        {
            if (images.Count < 1) return new List<Image>();

            var productImagesUrls = await this.storageService.UploadImageAsync(images, userId);

            var newImages = new List<Image>();

            foreach (var imageUrl in productImagesUrls)
            {
                Image productImage = new Image()
                {
                    CreatedById = userId,
                    Url = imageUrl,
                };

                newImages.Add(productImage);
            }

            await this.db.Images.AddRangeAsync(newImages);

            return newImages;
        }

        private async Task<ICollection<ProductImage>> CreateProductImagesAsync(ICollection<Image> images, string productId)
        {
            if (images.Count < 1) return new List<ProductImage>();

            var productImages = new List<ProductImage>();
            bool hasThumbnail = false;

            foreach (var image in images)
            {
                var productImage = await this.db.ProductsImages
                    .Include(x => x.Image)
                    .FirstOrDefaultAsync(x => x.ProductId == productId && x.ImageId == image.Id && x.IsDeleted != true);

                if (productImage == null)
                {
                    productImage = new ProductImage()
                    {
                        ProductId = productId,
                        ImageId = image.Id
                    };

                    productImages.Add(productImage);
                }

                if (productImage.IsThumbnail)
                {
                    hasThumbnail = true;
                }
            }

            if (productImages.Count > 0 && hasThumbnail == false)
            {
                productImages[0].IsThumbnail = true;
            }

            await this.db.ProductsImages.AddRangeAsync(productImages);

            return productImages;
        }

        private async Task<ICollection<Tag>> GetTagsAsync(ICollection<string> tags, string userId)
        {
            var allTags = new List<Tag>();

            foreach (var tag in tags)
            {
                Tag searchedTag = await this.db.Tags
                    .FirstOrDefaultAsync(x => x.Name.Trim().ToUpper() == tag.Trim().ToUpper() && x.IsDeleted != true);

                if (searchedTag == null)
                {
                    searchedTag = new Tag()
                    {
                        Name = tag.Trim().ToUpper(),
                        CreatedById = userId
                    };

                    await this.db.Tags.AddAsync(searchedTag);
                }

                allTags.Add(searchedTag);
            }


            return allTags;
        }

        private async Task<ICollection<ProductTag>> CreateProductTagsAsync(ICollection<Tag> tags, string productId)
        {
            var productTags = new List<ProductTag>();

            var allCurrentTagsToThisProduct = await this.db.ProductsTags
                .Where(x => x.ProductId == productId && x.IsDeleted != true)
                .ToListAsync();

            if (allCurrentTagsToThisProduct.Count > 0)
            {
                foreach (var currentTag in allCurrentTagsToThisProduct)
                {
                    this.db.ProductsTags.Remove(currentTag);
                    await this.db.SaveChangesAsync();
                }
            }

            foreach (var tag in tags)
            {
                var productTag = new ProductTag()
                {
                    ProductId = productId,
                    TagId = tag.Id
                };

                productTags.Add(productTag);
            }

            await this.db.ProductsTags.AddRangeAsync(productTags);

            return productTags;
        }

        private async Task<ICollection<Label>> GetLabelsAsync(ICollection<string> labels)
        {
            if (labels.Count < 1) return new List<Label>();

            var allLabels = new List<Label>();

            foreach (var label in labels)
            {
                Label searchedLabel = await this.db.Labels
                    .FirstOrDefaultAsync(x => x.Content.Trim().ToUpper() == label.Trim().ToUpper() && x.IsDeleted != true);

                if (searchedLabel == null)
                {
                    searchedLabel = new Label()
                    {
                        Content = label.Trim().ToUpper()
                    };

                    await this.db.Labels.AddAsync(searchedLabel);
                }

                allLabels.Add(searchedLabel);
            }


            return allLabels;
        }

        private async Task<ICollection<ProductLabel>> CreateProductLabelAsync(ICollection<Label> labels, string productId)
        {
            var productLabels = new List<ProductLabel>();

            var allCurrentLabelsToThisProduct = await this.db.ProductsLabels
               .Where(x => x.ProductId == productId && x.IsDeleted != true)
               .ToListAsync();

            if (allCurrentLabelsToThisProduct.Count > 0)
            {
                foreach (var currentLabel in allCurrentLabelsToThisProduct)
                {
                    this.db.ProductsLabels.Remove(currentLabel);
                    await this.db.SaveChangesAsync();
                }
            }

            foreach (var label in labels)
            {
                var productLabel = new ProductLabel()
                {
                    ProductId = productId,
                    LabelId = label.Id
                };

                productLabels.Add(productLabel);
            }

            await this.db.ProductsLabels.AddRangeAsync(productLabels);

            return productLabels;
        }

        private async Task<ICollection<ProductGalleryResponseModel>> GetProductsBySubcategoryIdAsync(ProductPaginationRequestModel model)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId && x.IsDeleted != true);
            if (user == null) { user = new User(); }

            //get requested sort criteria as enumeration
            SortingCriteria sortingCriteria = ParseSortingCriteria(model.SortingCriteria);

            var searchTerm = model.SearchTerm.Trim().ToLower();

            //get filtered products
            IQueryable<Models.Product> products = this.db.Products
                .Where(p => p.SubCategoryId == model.SubcategoryId
                    && p.Price >= model.LowestPrice
                    && p.Price <= model.HighestPrice
                    && p.Rating >= model.Rating
                    && (p.Name.ToLower().Contains(searchTerm) || p.Brand.ToLower().Contains(searchTerm))
                    && p.IsDeleted != true);

            //apply custom sorting on filtered product, it is still IQueryable
            products = OrderBy(products, sortingCriteria);

            //get 1 page with products and transform them into response model
            var orderedProducts = await products
                .Skip((model.Page - 1) * model.RecordsPerPage)
                .Take(model.RecordsPerPage)
                .Select(product => new ProductGalleryResponseModel
                {
                    Id = product.Id,
                    Name = product.Name,
                    Brand = product.Brand,
                    Price = product.Price,
                    Discount = product.Discount,
                    IsAvailable = product.IsAvailable,
                    IsInUserWishlist = product.Wishlists.Any(pw => pw.WishlistId == user.WishlistId && pw.ProductId == product.Id && product.IsDeleted != true),
                    Rating = product.Rating,
                    Image = product.Images
                            .FirstOrDefault(x => x.IsThumbnail && x.IsDeleted != true).Image.Url ?? product.Images.FirstOrDefault(x => x.IsDeleted != true).Image.Url,
                    Labels = product.Labels
                        .Select(x => x.Label.Content)
                        .ToList()
                })
                .ToListAsync();

            // if filter by availability is true, then get only available products, else availability no matter
            var productsFilteredByAvailability = orderedProducts
                .Where(p =>
                    model.InStock == true
                    ? p.IsAvailable == true
                    : (p.IsAvailable == true || p.IsAvailable == false))
                .ToList();

            return productsFilteredByAvailability;
        }

        private async Task<bool> IsProductInUserWishlistAsync(Models.Product product, User user)
        {
            return await this.db.ProductsWishlists
                            .AnyAsync(x => x.ProductId == product.Id && x.WishlistId == user.WishlistId && x.IsDeleted != true);
        }

        private SortingCriteria ParseSortingCriteria(string sortingCriteria)
        {
            bool isSortCriteriaParsed = Enum.TryParse<SortingCriteria>(sortingCriteria, out SortingCriteria criteria);

            if (!isSortCriteriaParsed)
            {
                return SortingCriteria.DateDescending;
            }

            return criteria;
        }

        private IQueryable<Models.Product> OrderBy(IQueryable<Models.Product> productsCollection, SortingCriteria sortingCriteria)
        {
            switch (sortingCriteria)
            {
                case SortingCriteria.DateDescending:
                    return productsCollection.OrderByDescending(e => e.CreatedOn);
                case SortingCriteria.PriceAscending:
                    return productsCollection.OrderBy(e => e.Price).ThenByDescending(x => x.CreatedOn);
                case SortingCriteria.PriceDescending:
                    return productsCollection.OrderByDescending(e => e.Price).ThenByDescending(x => x.CreatedOn);
                case SortingCriteria.PercentDiscountDescending:
                    return productsCollection.OrderByDescending(e => e.Discount).ThenByDescending(x => x.CreatedOn);
                case SortingCriteria.Rating:
                    return productsCollection.OrderByDescending(e => e.Rating).ThenByDescending(x => x.CreatedOn);
                default:
                    return productsCollection.OrderByDescending(e => e.CreatedOn).ThenByDescending(x => x.CreatedOn);
            }
        }
    }
}