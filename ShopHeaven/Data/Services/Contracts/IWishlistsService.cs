using ShopHeaven.Models.Requests.Carts;
using ShopHeaven.Models.Requests.Wishlists;
using ShopHeaven.Models.Responses.Wishlists;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IWishlistsService
    {
        Task<AddProductToWishlistResponseModel> AddProductToWishlistAsync(AddProductToWishlistRequestModel model);

        Task<DeleteProductFromWishlistResponseModel> DeleteProductFromWishlistAsync(DeleteProductFromWishlistRequestModel model);
    }
}
