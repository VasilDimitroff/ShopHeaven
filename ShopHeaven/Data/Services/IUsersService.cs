using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Data.Services
{
    public interface IUsersService
    {
        Task<IdentityResult> CreateUser(CreateUserRequestModel model);

        Task<bool> IsUsernameExists(string username);
    }
}
