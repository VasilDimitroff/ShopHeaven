using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Requests.Specifications;
using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Currencies;
using ShopHeaven.Models.Responses.Products;
using ShopHeaven.Models.Responses.Specifications;

namespace ShopHeaven.Data.Services
{
    public class ProductsService : IProductsService
    {
        private readonly ShopDbContext db;
        private readonly IStorageService storageService;
        private readonly ICategoriesService categoriesService;
        private readonly ICurrencyService currencyService;

        public ProductsService(
            ShopDbContext db,
            IStorageService storageService,
            ICategoriesService categoriesService,
            ICurrencyService currencyService)
        {
            this.db = db;
            this.storageService = storageService;
            this.categoriesService = categoriesService;
            this.currencyService = currencyService;
        }
        public async Task<AdminProductResponseModel> CreateProductAsync(CreateProductRequestModel model)
        {
            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (user == null)
            {
                throw new NullReferenceException(GlobalConstants.UserDoesNotExist);
            }

            var subcategory = await this.db.SubCategories
                .Include(x => x.MainCategory)
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new NullReferenceException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            var currency = await this.db.Currencies.
                FirstOrDefaultAsync(x => x.Id == model.CurrencyId && x.IsDeleted != true);

            if (currency == null)
            {
                throw new NullReferenceException(GlobalConstants.CurrencyWithThisIdDoesntExist);
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

            var newProduct = new Product();

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
            await CreateProductImagesAsync(images, newProduct.Id);

            List<Specification> specifications = model.Specifications.Select(x => new Specification
            {
                ProductId = newProduct.Id,
                Key = x.Key,
                Value = x.Value,
            })
                .ToList();

            newProduct.CreatedById = user.Id;
            newProduct.Name = model.Name;
            newProduct.Description = model.Description;
            newProduct.Brand = model.Brand != null ? model.Brand.Trim() : "";
            newProduct.Currency = currency;
            newProduct.SubCategoryId = subcategory.Id;
            newProduct.Discount = model.Discount;
            newProduct.Price = model.Price;
            newProduct.HasGuarantee = model.HasGuarantee;
            newProduct.Quantity = model.Quantity;
            newProduct.Specifications = specifications;

            await this.db.Products.AddAsync(newProduct);
            await this.db.SaveChangesAsync();

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
                Currency = new CurrencyResponseModel
                {
                    Id = currency.Id,
                    Name = currency.Name,
                    Code = currency.Code,
                },
                Price = newProduct.Price,
                Discount = newProduct.Discount,
                Quantity = newProduct.Quantity,
                isAvailable = newProduct.IsAvailable,
                Rating = newProduct.Rating,
                HasGuarantee = newProduct.HasGuarantee,
                ReviewsCount = newProduct.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Count(),
                CreatedBy = user.Email,
                Images = images
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Url)
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

            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (user == null)
            {
                throw new NullReferenceException(GlobalConstants.UserDoesNotExist);
            }

            var subcategory = await this.db.SubCategories
                .Include(x => x.MainCategory)
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new NullReferenceException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            var currency = await this.db.Currencies.
                FirstOrDefaultAsync(x => x.Id == model.CurrencyId && x.IsDeleted != true);

            if (currency == null)
            {
                throw new NullReferenceException(GlobalConstants.CurrencyWithThisIdDoesntExist);
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
            await CreateProductImagesAsync(images, product.Id);

            List<Specification> specifications = model.Specifications.Select(x => new Specification
            {
                ProductId = product.Id,
                Key = x.Key,
                Value = x.Value,
            })
                .ToList();

            product.CreatedById = user.Id;
            product.ModifiedOn = DateTime.UtcNow;
            product.Name = model.Name;
            product.Description = model.Description;
            product.Brand = model.Brand != null ? model.Brand.Trim() : "";
            product.Currency = currency;
            product.SubCategoryId = subcategory.Id;
            product.Discount = model.Discount;
            product.Price = model.Price;
            product.HasGuarantee = model.HasGuarantee;
            product.Quantity = model.Quantity;
            product.Specifications = specifications;

            await this.db.SaveChangesAsync();

            var allProductImages = await this.db.ProductsImages
                .Where(x => x.ProductId == product.Id && x.IsDeleted != true)
                .Select(x => x.Image.Url)
                .ToListAsync();

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
                Currency = new CurrencyResponseModel
                {
                    Id = currency.Id,
                    Name = currency.Name,
                    Code = currency.Code,
                },
                Price = product.Price,
                Discount = product.Discount,
                Quantity = product.Quantity,
                isAvailable = product.IsAvailable,
                Rating = product.Rating,
                HasGuarantee = product.HasGuarantee,
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

        public async Task<ProductsWithCreationInfoResponseModel> GetAllWithCreationInfoAsync(ProductPaginationRequestModel model)
        {
            List<AdminProductResponseModel> products = await this.GetAllAsync(model) as List<AdminProductResponseModel>;

            List<CategoryNamesResponseModel> categories = await this.categoriesService.GetAllCategoryNamesAsync();

            List<CurrencyResponseModel> currencies = await this.currencyService.GetCurrenciesAsync();

            //select these product which contains search term in their name
            //also product is not deleted
            //and also if there is Category Id selected, filter products by this category
            //if categoryid is empty, dont filter by category
            var productsCount = this.db.Products
                 .Where(p => (p.Name.ToLower().Contains(model.SearchTerm.Trim().ToLower())
                    || p.Brand.ToLower().Contains(model.SearchTerm.Trim().ToLower()))
                    && (model.CategoryId == ""
                            ? p.SubCategory.MainCategoryId != null
                            : p.SubCategory.MainCategoryId == model.CategoryId)
                    && p.IsDeleted != true)
                .Count();

            var responseModel = new ProductsWithCreationInfoResponseModel
            {
                Products = products,
                Categories = categories,
                Currencies = currencies,
                ProductsCount = productsCount,
                PagesCount = (int)Math.Ceiling((double)productsCount / model.RecordsPerPage)
            };

            return responseModel;
        }

        public async Task<ICollection<AdminProductResponseModel>> GetAllAsync(ProductPaginationRequestModel model)
        {
            var products = await this.db.Products
            .Where(p => (p.Name.ToLower().Contains(model.SearchTerm.Trim().ToLower())
             || p.Brand.ToLower().Contains(model.SearchTerm.Trim().ToLower()))
                    && (model.CategoryId == ""
                            ? p.SubCategory.MainCategoryId != null
                            : p.SubCategory.MainCategoryId == model.CategoryId)
                    && p.IsDeleted != true)
            .OrderByDescending(p => p.CreatedOn)
            .Skip((model.Page - 1) * model.RecordsPerPage)
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
                Currency = new CurrencyResponseModel
                {
                    Id = p.Currency.Id,
                    Name = p.Currency.Name,
                    Code = p.Currency.Code,
                },
                CreatedBy = p.CreatedBy.Email,
                Price = p.Price,
                Discount = p.Discount,
                Quantity = p.Quantity,
                HasGuarantee = p.HasGuarantee,
                isAvailable = p.IsAvailable,
                Rating = p.Rating,
                ReviewsCount = p.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Count(),
                Images = p.Images
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Image.Url)
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


            return products;
        }

        public Task<ICollection<GetProductByLabelsResponseModel>> GetProductsByLabelAsync(GetProductsByLabelRequestModel model)
        {
            ;
            return null;
        }

        public async Task<ProductBaseResponseModel> DeleteProductAsync(DeleteProductRequestModel model, bool delete)
        {
            Product productToDelete = await this.db.Products
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

        private void ConfigureDeletionInfo(Product product, bool forDelete)
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

        private async Task CreateProductImagesAsync(ICollection<Image> images, string productId)
        {
            if (images.Count < 1) return;

            var productImages = new List<ProductImage>();

            foreach (var image in images)
            {
                var productImage = await this.db.ProductsImages
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
            }

            await this.db.ProductsImages.AddRangeAsync(productImages);
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
    }
}
