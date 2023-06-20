using Microsoft.AspNetCore.Identity;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Users;

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

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, password);

            return passwordValid;
        }

        public async Task ChangePasswordAsync(ChangePasswordRequestModel model)
        {
            bool isCurrentPasswordValid = await this.ValidatePasswordAsync(model.UserId, model.OldPassword);

            if (!isCurrentPasswordValid)
            {
                throw new ArgumentException(GlobalConstants.PasswordNotValid);
            }

            if (model.NewPassword != model.ConfirmNewPassword)
            {
                throw new ArgumentException(GlobalConstants.PasswordsDoesntMatch);
            }

            if (model.NewPassword.Length < GlobalConstants.PasswordLength || model.ConfirmNewPassword.Length < GlobalConstants.PasswordLength)
            {
                throw new ArgumentException(GlobalConstants.PasswordLengthNotEnough);
            }

            if (!(model.NewPassword.Any(char.IsDigit) && model.NewPassword.Any(char.IsLetter)))
            {
                throw new ArgumentException(GlobalConstants.PasswordMustContainsLettersAndDigits);
            }

            var user = await this.userManager.FindByIdAsync(model.UserId);

            var result = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new InvalidOperationException(GlobalConstants.ChangePasswordFailed);
            }
        }
    }
}
