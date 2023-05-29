using Azure;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Requests.Categories;
using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Data.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly IStorageService storageService;
        private readonly ShopDbContext db;

        public CategoriesService(IStorageService storageService, ShopDbContext db)
        {
            this.storageService = storageService;
            this.db = db;
        }

        public async Task<List<CategorySummaryInfoResponseModel>> GetCategoriesSummaryInfoAsync()
        {
            var categories = await this.db.MainCategories
                .Where(x => x.IsDeleted != true)
                .OrderByDescending(x => x.SubCategories
                    .Where(x => x.IsDeleted != true)
                    .SelectMany(x => x.Products
                        .Where(x => x.IsDeleted !=true))
                    .Count())
                .ThenByDescending(x => x.SubCategories.Count())
                .Select(x => new CategorySummaryInfoResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image.Url,
                    ProductsCount = x.SubCategories
                        .Where(x => x.IsDeleted != true)
                        .SelectMany(x => x.Products.Where(x => x.IsDeleted != true))
                        .Count(),
                    SubcategoriesCount = x.SubCategories
                        .Where(x => x.IsDeleted != true)
                        .Count()
                })
                .ToListAsync();

            return categories;
        }

        public async Task<GetCategoriesResponseModel> CreateCategoryAsync(CreateCategoryRequestModel model)
        {

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentNullException(GlobalConstants.CategoryNameCannotBeEmpty);
            }

            if (model.Image == null)
            {
                throw new ArgumentNullException(GlobalConstants.CategoryImageCannotBeEmpty);
            }

            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserDoesNotExist);
            }

            var category = await this.db.MainCategories.FirstOrDefaultAsync(x => x.Name == model.Name && x.IsDeleted != true);

            if (category != null)
            {
                throw new ArgumentException(GlobalConstants.CategoryWithThisNameAlreadyExist);
            }

            var imageUrls = await this.storageService.UploadImageAsync(new List<IFormFile> { model.Image }, model.CreatedBy);
            string categoryImageUrl = imageUrls[0];

            Image categoryImage = new Image()
            {
                CreatedById = model.CreatedBy,
                Url = categoryImageUrl,
            };

            MainCategory newCategory = new MainCategory
            {
                Name = model.Name.Trim(),
                Description = model.Description != null ? model.Description.Trim() : "",
                CreatedById = model.CreatedBy,
                IsDeleted = false,
                Image = categoryImage,
            };

            await this.db.Images.AddAsync(categoryImage);
            await this.db.MainCategories.AddAsync(newCategory);

            await this.db.SaveChangesAsync();

            var returnedCategory = new GetCategoriesResponseModel()
            {
               Id = newCategory.Id,
               Name = newCategory.Name,
               Description = newCategory.Description,
               CreatedBy = user.Email,
               Image = categoryImageUrl,
               Subcategories = new HashSet<SubcategoryResponseModel>(),
            };

            return returnedCategory;
        }

        //this method works for delete and undelete dependent of delete parameter
        public async Task<CategoryBaseResponseModel> DeleteCategoryAsync(DeleteCategoryRequestModel model, bool delete)
        {
            var categoryToDelete = await this.db.MainCategories
                .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != delete);

            if (categoryToDelete == null)
            {
                throw new ArgumentException(GlobalConstants.CategoryWithThisIdDoesntExist);
            }

            categoryToDelete.IsDeleted = delete;

            if (delete == true)
            {
                categoryToDelete.DeletedOn = DateTime.UtcNow;
            }
            else
            {
                categoryToDelete.DeletedOn = null;
            }

            var productsToDelete = await this.db.Products
                .Where(x => x.SubCategory.MainCategory.Id == model.Id && x.IsDeleted != delete)
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
                    .Where( x=> x.IsDeleted != delete))
                .Include(x => x.Specifications
                    .Where(x=> x.IsDeleted != delete))
                .ToListAsync();


            var subcategoriesToDelete = await this.db.SubCategories
                .Where(x => x.MainCategoryId == model.Id && x.IsDeleted != delete)
                .ToListAsync();

            var deletedSubcategories = 0;
            var deletedProducts = 0;
            var deletedReviews = 0;
            var deletedTags = 0;
            var deletedCarts = 0;
            var deletedWishlists = 0;
            var deletedOrders = 0;
            var deletedLabels = 0;
            var deletedImages = 0;
            var deletedSpecifications = 0;

            foreach(var product in productsToDelete)
            {
                deletedProducts++;

                foreach (var review in product.Reviews)
                {
                    deletedReviews++;
                    review.IsDeleted = delete;
                }

                foreach (var tag in product.Tags)
                {
                    deletedTags++;
                    tag.IsDeleted = delete;
                }

                foreach (var cart in product.Carts)
                {
                    deletedCarts++;
                    cart.IsDeleted = delete;
                }

                foreach (var wishlist in product.Wishlists)
                {
                    deletedWishlists++;
                    wishlist.IsDeleted = delete;
                }

                foreach (var order in product.Orders)
                {
                    deletedOrders++;
                    order.IsDeleted = delete;
                }

                foreach (var label in product.Labels)
                {
                    deletedLabels++;
                    label.IsDeleted = delete;
                }

                foreach (var image in product.Images)
                {
                    deletedImages++;
                    image.IsDeleted = delete;
                }

                foreach (var specification in product.Specifications)
                {
                    deletedSpecifications++;
                    specification.IsDeleted = delete;
                }

                product.IsDeleted = delete;
            }

            foreach (var subcategory in subcategoriesToDelete)
            {
                deletedSubcategories++;
                subcategory.IsDeleted = delete;
                
                if (delete == true)
                {
                    subcategory.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    subcategory.DeletedOn = null;
                }
            }
 
            ConfigureDeletionInfo(productsToDelete, delete);

            await this.db.SaveChangesAsync();

            if (delete == true)
            {
                var responseModel = new DeleteCategoryResponseModel()
                {
                    Id = categoryToDelete.Id,
                    Name = categoryToDelete.Name,
                    DeletedSubcategories = deletedSubcategories,
                    DeletedCarts = deletedCarts,
                    DeletedImages = deletedImages,
                    DeletedLabels = deletedLabels,
                    DeletedOrders = deletedOrders,
                    DeletedProducts = deletedProducts,
                    DeletedReviews = deletedReviews,
                    DeletedSpecifications = deletedSpecifications,
                    DeletedTags = deletedTags,
                    DeletedWishlists = deletedWishlists
                };

                return responseModel;
            }

            else
            {
                var responseModel = new UndeleteCategoryResponseModel()
                {
                    Id = categoryToDelete.Id,
                    Name = categoryToDelete.Name,
                    RevealedSubcategories = deletedSubcategories,
                    RevealedCarts = deletedCarts,
                    RevealedImages = deletedImages,
                    RevealedLabels = deletedLabels,
                    RevealedOrders = deletedOrders,
                    RevealedProducts = deletedProducts,
                    RevealedReviews = deletedReviews,
                    RevealedSpecifications = deletedSpecifications,
                    RevealedTags = deletedTags,
                    RevealedWishlists = deletedWishlists
                };

                return responseModel;
            }   
        }

        public async Task<EditCategoryResponseModel> EditCategoryAsync(EditCategoryRequestModel model)
        {
            var searchedCategory = await this.db.MainCategories       
                .Include(x => x.Image)
                .Include(x => x.CreatedBy)
                .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != true);

            if (searchedCategory == null)
            {
                throw new ArgumentNullException(GlobalConstants.CategoryWithThisIdDoesntExist);
            }

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentNullException(GlobalConstants.CategoryNameCannotBeEmpty);
            }

            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true );

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserDoesNotExist);
            }

            if (model.Image != null)
            {
                var imageUrls = await this.storageService.UploadImageAsync(new List<IFormFile> { model.Image }, model.CreatedBy);
                string categoryImageUrl = imageUrls[0];

                Image categoryImage = new Image()
                {
                    CreatedById = model.CreatedBy,
                    Url = categoryImageUrl,
                };

                await this.db.Images.AddAsync(categoryImage);
                await this.db.SaveChangesAsync();

                searchedCategory.Image = categoryImage;
            }

            searchedCategory.Name = model.Name;
            searchedCategory.Description = model.Description != null ? model.Description.Trim() : "";
            searchedCategory.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var editedCategory = new EditCategoryResponseModel()
            {
                Id = searchedCategory.Id,
                Name = searchedCategory.Name,
                Description = searchedCategory.Description,
                CreatedBy = searchedCategory.CreatedBy.Email,
                Image = searchedCategory.Image.Url,
            };

            return editedCategory;
        }

        public async Task<List<GetCategoriesResponseModel>> GetAllCategoriesAsync()
        {
            List<GetCategoriesResponseModel> allCategories = await this.db.MainCategories
                .Where(x => x.IsDeleted != true)
                .OrderByDescending(category => category.SubCategories
                        .SelectMany(subcategory => subcategory.Products)
                        .Count())
                .ThenByDescending(category => category.SubCategories.Count())
                .Select(x => new GetCategoriesResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image.Url,
                    CreatedBy = x.CreatedBy.Email,
                    Subcategories = x.SubCategories
                    .Where(s => s.IsDeleted != true)
                    .Select(x => new SubcategoryResponseModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Image = x.Image.Url,
                        ProductsCount = x.Products.Count(),
                        CreatedBy = x.CreatedBy.Email,
                    })
                    .ToList()
                })
                .ToListAsync();

            return allCategories;
        }

        public async Task<List<CategoryWithSubcategoriesResponseModel>> GetAllCategoryNamesAsync()
        {
            var categories = await this.db.MainCategories
                .Where(x => x.IsDeleted != true)
                .OrderByDescending(category => category.SubCategories.Where(s => s.IsDeleted != true)
                        .SelectMany(subcategory => subcategory.Products.Where(p => p.IsDeleted != true))
                        .Count())
                .ThenByDescending(category => category.SubCategories.Count())
                .Select(x => new CategoryWithSubcategoriesResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Subcategories = x.SubCategories
                    .Where(x => x.IsDeleted != true)
                    .Select(s => new SubcategoryBaseResponseModel
                    {
                        Id = s.Id,
                        Name = s.Name,
                    })
                    .ToList()
                })
                .ToListAsync();

            return categories;
        }

        public async Task<GetCategoriesResponseModel> GetCategoryByIdAsync(string id)
        {
            GetCategoriesResponseModel getCategoryResponseModel = await this.db.MainCategories
                .Where(x => x.Id == id && x.IsDeleted != true)
                .Select(x => new GetCategoriesResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Image = x.Image.Url,
                    CreatedBy = x.CreatedBy.Email,
                    Subcategories = x.SubCategories.Select(s => new SubcategoryResponseModel
                    {
                        Id = s.Id,
                        Name= s.Name,
                        Description= s.Description,
                        Image = s.Image.Url,
                        CreatedBy = s.CreatedBy.Email,
                        ProductsCount = s.Products.Count()
                    })
                })
                .FirstOrDefaultAsync();

            return getCategoryResponseModel;
        }

        private void ConfigureDeletionInfo(IEnumerable<Product> items, bool forDelete)
        {
            foreach (var product in items)
            {
                foreach (var review in product.Reviews)
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

                foreach (var tag in product.Tags)
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

                foreach (var cart in product.Carts)
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

                foreach (var wishlist in product.Wishlists)
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

                foreach (var order in product.Orders)
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

                foreach (var label in product.Labels)
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

                foreach (var image in product.Images)
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

                foreach (var specification in product.Specifications)
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
        }
    }
}
