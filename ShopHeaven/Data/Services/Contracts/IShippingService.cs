using ShopHeaven.Data.Models;
using ShopHeaven.Models.Responses.ShippingMethods;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IShippingService
    {
        Task<ICollection<ShippingMethodResponseModel>> GetShippingMethodsAsync();

        Task<ShippingMethod> GetShippingMethodByNameAsync(string method);
    }
}
