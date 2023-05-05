using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IJwtService
    {
        string CreateToken(BasicUserResponseModel user, ICollection<string> userRoles);
    }
}
