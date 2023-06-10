using ShopHeaven.Models.Responses.ShippingMethods;

namespace ShopHeaven.Models.Responses.Orders
{
    public class CheckoutResponseModel
    {
        public string? Recipient { get; set; }

        public string? Phone { get; set; }

        public string? Country { get; set; }

        public string? City { get; set; }

        public string? Address { get; set; }

        public OrderSummaryResponseModel OrderSummary { get; set; }

        public ICollection<string> PaymentMethods { get; set; }

        public ICollection<ShippingMethodResponseModel> ShippingMethods { get; set; }

    }
}
