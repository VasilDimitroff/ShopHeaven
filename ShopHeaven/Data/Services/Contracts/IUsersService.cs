using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task RegisterAsync(CreateUserRequestModel model);

        Task<IList<string>> GetRolesNamesAsync(string userId);

        Task<ICollection<UserWithRolesResponseModel>> GetAllAsync();

        public BasicUserResponseModel GetUserInfoFromJwt();

        public Task<BasicUserResponseModel> GetUserByEmailAsync(string email);
    }
}
