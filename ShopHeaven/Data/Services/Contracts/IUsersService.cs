using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task RegisterAsync(CreateUserRequestModel model);

        Task<IList<string>> GetUserRolesNamesAsync(string userId);

        Task<GetUsersAndRolesResponseModel> GetAllAsync();

        public BasicUserResponseModel GetUserInfoFromJwt();

        public Task<BasicUserResponseModel> GetUserByEmailAsync(string email);

        public Task<UserWithRolesResponseModel> AddToRoleAsync(AddToRoleRequestModel model);

        public Task<UserWithRolesResponseModel> RemoveFromRoleAsync(RemoveFromRoleRequestModel model);
    }
}
