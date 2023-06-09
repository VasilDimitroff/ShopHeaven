﻿using ShopHeaven.Models.Requests.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IAuthService
    {
        Task<bool> ValidatePasswordAsync(string userId, string password);

        Task ChangePasswordAsync(ChangePasswordRequestModel model);
    }
}
