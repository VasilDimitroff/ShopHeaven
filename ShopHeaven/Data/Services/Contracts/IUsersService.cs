using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task<IdentityResult> CreateUser(CreateUserRequestModel model);
    }
}
