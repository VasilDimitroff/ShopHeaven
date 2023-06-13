namespace ShopHeaven.Models.Responses.Payments
{
    public class PaymentSessionResponseModel
    {
        public string Id { get; set; }

        public bool IsSuccessful { get; set; }

        public string CreatedOn { get; set; }
    }
}
