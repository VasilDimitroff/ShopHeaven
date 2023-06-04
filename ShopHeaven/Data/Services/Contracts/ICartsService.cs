using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICartsService
    {
        Task<AddProductToCartResponseModel> AddProductToCartAsync(AddProductToCartRequestModel model);
    }
}
