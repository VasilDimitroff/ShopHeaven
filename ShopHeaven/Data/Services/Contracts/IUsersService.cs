using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task RegisterAsync(CreateUserRequestModel model);

        Task<IList<string>> GetUserRolesAsync(string userId);

        Task<IList<BasicUserResponseModel>> GetAllAsync();

        public BasicUserResponseModel GetUserInfo();
    }
}
