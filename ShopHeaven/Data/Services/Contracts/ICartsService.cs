using ShopHeaven.Models.Requests.Carts;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICartsService
    {
        Task<AddProductToCartResponseModel> AddProductToCartAsync(AddProductToCartRequestModel model);

        Task<string> DeleteProductFromCartAsync(DeleteProductFromCartRequestModel model);

        Task<ICollection<CartProductResponseModel>> GetCartProductsAsync(GetCartProductsRequestModel model);

        Task<CartSummaryResponseModel> GetCartTotalPriceAsync(string cartId);
    }
}
