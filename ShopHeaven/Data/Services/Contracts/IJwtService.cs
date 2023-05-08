using ShopHeaven.Models.Token;
using ShopHeaven.Models.Responses.Users;
using ShopHeaven.Data.Models;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IJwtService
    {
        Task<string> CreateJwtTokenAsync(string userId, ICollection<string> userRoles);

        Task SetRefreshTokenAsync(RefreshToken refreshToken, string userId);

        Task<UserAuthorizationModel> FindUserByRefreshTokenAsync(string refreshToken);

        RefreshToken CreateRefreshToken();

        Task DeleteRefreshTokenAsync(string token);
    }
}
