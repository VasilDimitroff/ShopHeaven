using Microsoft.AspNetCore.Identity;
using ShopHeaven.Data.Models;

namespace ShopHeaven.Data.Services.Contracts
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
            User user = await this.userManager.FindByIdAsync(userId);

            var passwordValid = await this.userManager.CheckPasswordAsync(user, password);

            return passwordValid;
        }
    }
}
