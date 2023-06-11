using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Carts;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICartsService
    {
        Task<Cart> GetCartAsync(string cartId);

        Task<AddProductToCartResponseModel> AddProductToCartAsync(AddProductToCartRequestModel model);

        Task DeleteProductFromCartAsync(DeleteProductFromCartRequestModel model);

        Task<ICollection<CartProductResponseModel>> GetCartProductsFullInfoAsync(GetCartProductsRequestModel model);

        Task<CartSummaryResponseModel> GetCartTotalPriceAsync(string cartId);

        public int GetProductsCountInCartAsync(string cartId);

        public Task<ChangeProductQuantityResponseModel> ChangeProductQuantityAsync(ChangeProductQuantityRequestModel model);
    }
}
