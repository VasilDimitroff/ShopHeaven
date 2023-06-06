namespace ShopHeaven.Models.Requests.Carts
{
    public class ChangeProductQuantityRequestModel
    {
        public string UserId { get; set; }

        public string CartId { get; set; }

        public string ProductId { get; set; }

        public int NewQuantity { get; set; }
    }
}
