using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task RegisterAsync(CreateUserRequestModel model);

        Task<IList<string>> GetUserRolesNamesAsync(string userId);

        Task<GetUsersAndRolesResponseModel> GetAllAsync(UserPaginationRequestModel model);

        public BasicUserResponseModel GetUserInfoFromJwt();

        public Task<BasicUserResponseModel> GetUserByEmailAsync(string email);

        public Task<UserWithRolesResponseModel> AddToRoleAsync(AddToRoleRequestModel model);

        public Task<UserWithRolesResponseModel> RemoveFromRoleAsync(RemoveFromRoleRequestModel model);

        public Task<UserWithRolesResponseModel> EditUserAsync(EditUserRequestModel model);

        public Task<UserWithRolesResponseModel> DeleteUserAsync(DeleteUserRequestModel model);

        public Task<UserWithRolesResponseModel> UndeleteUserAsync(UndeleteUserRequestModel model);
    }
}
