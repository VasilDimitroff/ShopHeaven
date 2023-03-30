
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Data.Services
{
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> userManager;
        private readonly ShopDbContext db;

        public UsersService(UserManager<User> userManager, ShopDbContext db)
        {
            this.userManager = userManager;
            this.db = db;
        }
        public async Task<IdentityResult> CreateUser(CreateUserRequestModel model)
        {
            bool isUserExists =  await this.IsUsernameExists(model.Username);

            if (isUserExists)
            {
                throw new ArgumentException(GlobalConstants.UserWithThisUsernameAlreadyExist);
            }

            if(model.Password.Trim() != model.ConfirmPassword.Trim())
            {
                throw new ArgumentException(GlobalConstants.PasswordsDoesntMatch);
            }

            User user = new User{
               CartId = "ExampleCartId",
               WishlistId = "ExampleWishListId",
               Email = "v.b.dimitrov@abv.bg",
               IsDeleted = false,
               UserName = model.Username,        
            };

            IdentityResult result = await this.userManager.CreateAsync(user, model.Password.Trim());

            return result;
        }

        public async Task<bool> IsUsernameExists(string username)
        {
           return await db.Users.AnyAsync(u => u.UserName == username && u.IsDeleted == false);
        }


    }
}
