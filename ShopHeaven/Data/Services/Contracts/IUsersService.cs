using ShopHeaven.Models.Requests.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task Register(CreateUserRequestModel model);
    }
}
