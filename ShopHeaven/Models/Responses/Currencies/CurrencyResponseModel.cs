namespace ShopHeaven.Models.Responses.Currencies
{
    public class CurrencyResponseModel
    {
        public string Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public bool IsCurrentForApplication { get; set; }
    }
}
