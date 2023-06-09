﻿using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IUsersService
    {
        Task<User> GetUserAsync(string userId);

        Task RegisterAsync(CreateUserRequestModel model);

        Task<UserWithRolesResponseModel> GetUserWithRolesAsync(string userId);

        Task<IList<string>> GetUserRolesNamesAsync(string userId);

        Task<GetUsersAndRolesResponseModel> GetAllAsync(UserPaginationRequestModel model);

        public UserResponseModel GetUserInfoFromJwt();

        public Task<UserResponseModel> GetAuthInfoByUserEmail(string email);

        public Task<UserWithRolesResponseModel> AddToRoleAsync(AddToRoleRequestModel model);

        public Task<UserWithRolesResponseModel> RemoveFromRoleAsync(RemoveFromRoleRequestModel model);

        public Task<UserWithRolesResponseModel> EditUserAsync(EditUserRequestModel model);

        public Task<UserWithRolesResponseModel> DeleteUserAsync(DeleteUserRequestModel model);

        public Task<UserWithRolesResponseModel> UndeleteUserAsync(UndeleteUserRequestModel model);

        public bool IsUserAdmin();
    }
}
