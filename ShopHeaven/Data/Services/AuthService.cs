using Microsoft.AspNetCore.Identity;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;

namespace ShopHeaven.Data.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> userManager;

        public AuthService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<bool> ValidatePasswordAsync(string userId, string password)
        {
            User user = await userManager.FindByIdAsync(userId);

            var passwordValid = await userManager.CheckPasswordAsync(user, password);

            return passwordValid;
        }
    }
}
