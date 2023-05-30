using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Subcategories;
using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Data.Services
{
    public class SubcategoriesService : ISubcategoriesService
    {
        private readonly ShopDbContext db;
        private readonly IStorageService storageService;

        public SubcategoriesService(ShopDbContext db, IStorageService storageService)
        {
            this.db = db;
            this.storageService = storageService;
        }

        public async Task<SubcategoriesByCategoryIdResponseModel> GetSubcategoriesByCategoryId(SubcategorySummaryRequestModel model)
        {
            var category = await this.db.MainCategories
                .FirstOrDefaultAsync(x => x.Id == model.CategoryId && x.IsDeleted != true);

            if (category == null)
            {
                throw new ArgumentException(GlobalConstants.CategoryWithThisIdDoesntExist);
            }

            var subcategories = await this.db.SubCategories
                .Where(x => x.MainCategoryId == model.CategoryId && x.IsDeleted != true)
                .Select(x => new SubcategoryMainInfoResponseModel
                {
                    Id = x.Id,
                    Description = x.Description,
                    Name = x.Name,
                    Image = x.Image.Url,
                    ProductsCount = x.Products.Where(x => x.IsDeleted != true).Count(),
                })
                .ToListAsync();

            var subcategoriesByCategoryId = new SubcategoriesByCategoryIdResponseModel
            {
                Category = new CategoryBaseResponseModel
                {
                    Id = category.Id,
                    Name = category.Name,
                },
                Subcategories = subcategories,
                ProductsCount = subcategories.Sum(x => x.ProductsCount)
            };

            return subcategoriesByCategoryId;
        }

        public async Task<SubcategoryResponseModel> CreateSubcategoryAsync(CreateSubcategoryRequestModel model)
        {
            User user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);
        
            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserDoesNotExist);
            }

            var category = await this.db.MainCategories.FirstOrDefaultAsync(x => x.Id == model.CategoryId && x.IsDeleted != true);

            if (category == null)
            {
                throw new ArgumentException(GlobalConstants.CategoryWithThisIdDoesntExist);
            }

            if (model.Image == null)
            {
                throw new ArgumentNullException(GlobalConstants.CategoryImageCannotBeEmpty);
            }

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentException(GlobalConstants.CategoryNameCannotBeEmpty);
            }

            var imageUrls = await this.storageService.UploadImageAsync(new List<IFormFile> { model.Image }, model.CreatedBy);
            string subcategoryImageUrl = imageUrls[0];

            Image subcategoryImage = new Image()
            {
                CreatedById = model.CreatedBy,
                Url = subcategoryImageUrl,
            };

            var subcategory = new SubCategory()
            {
                Image = subcategoryImage,
                Name = model.Name.Trim(),
                Description = model.Description != null ? model.Description.Trim() : "",
                MainCategoryId = model.CategoryId,
                CreatedById = model.CreatedBy,
            };

            await this.db.Images.AddAsync(subcategoryImage);
            await this.db.SubCategories.AddAsync(subcategory);
            await this.db.SaveChangesAsync();

            var newSubcategoryResponseModel = new SubcategoryResponseModel()
            {
                Id = subcategory.Id,
                Description = subcategory.Description,
                Name = subcategory.Name,
                CreatedBy = user.Email,
                Image = subcategoryImage.Url,
                ProductsCount = subcategory.Products.Count()
            };

            return newSubcategoryResponseModel;
        }

        //this method is used for undelete too dependent of bool parameter
        public async Task<SubcategoryBaseResponseModel> DeleteSubcategoryAsync(BasicSubcategoryRequestModel model, bool delete)
        {
            var subcategoryToDelete = await this.db.SubCategories
              .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != delete);

            if (subcategoryToDelete == null)
            {
                throw new ArgumentException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            subcategoryToDelete.IsDeleted = delete;

            if (delete)
            {
                subcategoryToDelete.DeletedOn = DateTime.UtcNow;
            }
            else
            {
                subcategoryToDelete.DeletedOn = null;
            }

            var productsToDelete = await this.db.Products
                .Where(x => x.SubCategoryId == model.Id && x.IsDeleted != delete)
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
                .ToListAsync();


            var deletedProducts = 0;
            var deletedReviews = 0;
            var deletedTags = 0;
            var deletedCarts = 0;
            var deletedWishlists = 0;
            var deletedOrders = 0;
            var deletedLabels = 0;
            var deletedImages = 0;
            var deletedSpecifications = 0;

            foreach (var product in productsToDelete)
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

            ConfigureDeletionInfo(productsToDelete, delete);

            await this.db.SaveChangesAsync();

            if(delete)
            {
                var responseModel = new DeleteSubcategoryResponseModel()
                {
                    Id = subcategoryToDelete.Id,
                    Name = subcategoryToDelete.Name,
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
                var responseModel = new UndeleteSubcategoryResponseModel()
                {
                    Id = subcategoryToDelete.Id,
                    Name = subcategoryToDelete.Name,
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

        public async Task<SubcategoryResponseModel> EditSubcategoryAsync(EditSubcategoryRequestModel model)
        {
            var searchedSubcategory = await this.db.SubCategories
                .Include(x => x.Image)
                .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted != true);

            if (searchedSubcategory == null)
            {
                throw new ArgumentNullException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentNullException(GlobalConstants.SubcategoryNameCannotBeEmpty);
            }

            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserDoesNotExist);
            }

            if (model.Image != null)
            {
                var imageUrls = await this.storageService.UploadImageAsync(new List<IFormFile> { model.Image }, model.CreatedBy);
                string subcategoryImageUrl = imageUrls[0];

                Image subcategoryImage = new Image()
                {
                    CreatedById = model.CreatedBy,
                    Url = subcategoryImageUrl,
                };

                await this.db.Images.AddAsync(subcategoryImage);
                await this.db.SaveChangesAsync();

                searchedSubcategory.Image = subcategoryImage;
            }

            searchedSubcategory.Name = model.Name;
            searchedSubcategory.Description = model.Description != null ? model.Description.Trim() : "";
            searchedSubcategory.CreatedBy = user;
            searchedSubcategory.ModifiedOn = DateTime.UtcNow;

            var returnedSubcategory = new SubcategoryResponseModel()
            {
                Id = searchedSubcategory.Id,
                Name = searchedSubcategory.Name,
                Description = searchedSubcategory.Description,
                Image = searchedSubcategory.Image.Url,
                CreatedBy = user.Email,
                ProductsCount = searchedSubcategory.Products.Count,
            };

            await this.db.SaveChangesAsync();

            return returnedSubcategory;
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
