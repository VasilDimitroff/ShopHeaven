namespace ShopHeaven.Models.Responses.Payments
{
    public class PaymentResponseModel
    {
        public string Id { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; }

        public bool IsCompleted { get; set; }
    }
}
