namespace ShopHeaven.Models.Requests.Carts
{
    public class AddProductToCartRequestModel
    {
        public string UserId { get; set; }

        public string CartId { get; set; }

        public string ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
