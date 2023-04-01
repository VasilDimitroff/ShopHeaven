using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using System.Linq;

namespace ShopHeaven.Data.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly UserManager<User> userManager;
        private readonly ShopDbContext db;

        public CategoriesService(UserManager<User> userManager, ShopDbContext db)
        {
            this.userManager = userManager;
            this.db = db;
        }

        public async Task CreateCategory(CreateCategoryRequestModel model)
        {

            bool isUserExists = await this.db.Users.AnyAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (isUserExists == false)
            {
                throw new ArgumentException(GlobalConstants.UserDoesNotExist);
            }

            var category = await this.db.MainCategories.FirstOrDefaultAsync(x => x.Name == model.Name);
            
            if (category != null)
            {
                throw new ArgumentException(GlobalConstants.CategoryWithThisNameAlreadyExist);
            }

            //implement logic for image

            MainCategory newCategory = new MainCategory
            {
                Name = model.Name.Trim(),
                Description = model.Description.Trim(),
                CreatedById = model.CreatedBy,
                IsDeleted = false,
                ImageId = "someImageId",
            };

            await this.db.MainCategories.AddAsync(newCategory);

            await this.db.SaveChangesAsync();      
        }
    }
}
