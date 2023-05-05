using ShopHeaven.Models.Token;
using ShopHeaven.Models.Responses.Users;
using ShopHeaven.Data.Models;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IJwtService
    {
        Task<string> CreateTokenAsync(string userId, ICollection<string> userRoles);

        Task SetRefreshTokenAsync(RefreshToken refreshToken, string userId);

        Task<UserRefreshTokenResponse> FindUserByRefreshTokenAsync(string refreshToken);
    }
}
