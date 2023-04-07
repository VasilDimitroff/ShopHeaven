
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
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
            if (await db.Users.AnyAsync(u => u.UserName == model.Username && u.IsDeleted != true))
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
    }
}
