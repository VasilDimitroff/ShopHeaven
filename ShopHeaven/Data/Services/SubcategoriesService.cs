using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Subcategories;
using ShopHeaven.Models.Responses.Subcategories;

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
        public async Task<SubcategoriesResponseModel> CreateSubcategoryAsync(CreateSubcategoryRequestModel model)
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
                Description = model.Description.Trim(),
                MainCategoryId = model.CategoryId,
                CreatedById = model.CreatedBy,
            };

            await this.db.Images.AddAsync(subcategoryImage);
            await this.db.SubCategories.AddAsync(subcategory);
            await this.db.SaveChangesAsync();

            var newSubcategoryResponseModel = new SubcategoriesResponseModel()
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
    }
}
