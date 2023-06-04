namespace ShopHeaven.Models.Requests
{
    public record AddProductToCartRequestModel
    {
        public string UserId { get; set; }

        public string WishlistId { get; set; }

        public string ProductId { get; set; }
    }
}
