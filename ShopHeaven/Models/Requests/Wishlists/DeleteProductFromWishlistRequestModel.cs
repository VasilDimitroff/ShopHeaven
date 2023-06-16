namespace ShopHeaven.Models.Requests.Wishlists
{
    public class DeleteProductFromWishlistRequestModel
    {
        public string UserId { get; set; }

        public string WishlistId { get; set; }

        public string ProductId { get; set; }
    }
}
