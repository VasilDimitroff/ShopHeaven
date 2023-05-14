using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Subcategories;

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
        public async Task CreateSubcategoryAsync(CreateSubcategoryRequestModel model)
        {
            bool isUserExists = await this.db.Users.AnyAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);
        
            if (!isUserExists)
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
        }
    }
}
