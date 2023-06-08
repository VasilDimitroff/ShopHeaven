namespace ShopHeaven.Models.Responses.Carts
{
    public class CartSummaryResponseModel
    {
        public decimal TotalPriceWithNoDiscount { get; set; }

        public decimal TotalPriceWithDiscount { get; set; }

        public decimal TotalDiscount { get; set; }
    }
}
