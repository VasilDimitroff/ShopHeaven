using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Users;

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

        public async Task Register(CreateUserRequestModel model)
        {
            User user = new User { Email = model.Email.Trim(), IsDeleted = false };

            Wishlist wishlist = new Wishlist { UserId = user.Id };
            Cart cart = new Cart { UserId = user.Id };

            user.CartId = cart.Id;
            user.WishlistId = wishlist.Id;

            try
            {
                User userWithSameEmail = await this.db.Users.FirstOrDefaultAsync(x => x.Email == model.Email.Trim());

                if (userWithSameEmail != null)
                {
                    throw new ArgumentException(GlobalConstants.UserWithThisEmailAlreadyExists);
                }

                IdentityResult result = await this.userManager.CreateAsync(user, model.Password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
