namespace ShopHeaven.Models.Responses.Orders
{
    public class CheckoutResponseModel
    {
        public string? Recipient { get; set; }

        public string? Phone { get; set; }

        public string? Country { get; set; }

        public string? City { get; set; }

        public string? Address { get; set; }

        public string PaymentMethod { get; set; }

        public string ShippingMethod { get; set; }

    }
}
