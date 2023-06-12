namespace ShopHeaven.Models.Responses.ProductOrders
{
    public class ProductOrderResponseModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; } // in percent
    }
}
