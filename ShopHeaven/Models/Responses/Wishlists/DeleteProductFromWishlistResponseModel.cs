namespace ShopHeaven.Models.Responses.Wishlists
{
    public class DeleteProductFromWishlistResponseModel
    {
        public int WishlistProductsCount { get; set; }

        public bool IsProductInTheWishlist { get; set; }
    }
}
