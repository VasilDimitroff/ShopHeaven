using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
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

        public async Task RegisterAsync(CreateUserRequestModel model)
        {
            User user = new User
            { 
                UserName = "User" + (this.db.Users.Count() + 6564),
                Email = model.Email.Trim(),
                IsDeleted = false,
            };

            Wishlist wishlist = new Wishlist { UserId = user.Id };
            Cart cart = new Cart { UserId = user.Id };

            user.CartId = cart.Id;
            user.WishlistId = wishlist.Id;

             User userWithSameEmail = await this.db.Users.FirstOrDefaultAsync(x => x.Email == model.Email.Trim());

             if (userWithSameEmail != null)
             {
                 throw new ArgumentException(GlobalConstants.UserWithThisEmailAlreadyExists);
             }

             if(model.Password.Trim() != model.ConfirmPassword.Trim())
            {
                throw new ArgumentException(GlobalConstants.PasswordsDoesntMatch);
            }

            IdentityResult result = await this.userManager.CreateAsync(user, model.Password.Trim());

            if (!result.Succeeded)
            {
                throw new ArgumentException(GlobalConstants.UserNotCreated);
            }
        }

        public async Task<IList<string>> GetUserRolesAsync(string userId)
        {
            var user = await this.userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserNotFound);
            }

            IList<string> userRoles = await this.userManager.GetRolesAsync(user);

            return userRoles;
        }
    }
}
