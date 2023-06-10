namespace ShopHeaven.Models.Responses.Orders
{
    public class OrderSummaryResponseModel
    {
        public decimal TotalPriceWithNoDiscount { get; set; }

        public decimal CouponDiscount { get; set; } // nominal

        public decimal TotalPriceWithDiscount => TotalPriceWithDiscount - CouponDiscount;

        public decimal Discount => TotalPriceWithNoDiscount - TotalPriceWithDiscount; // nominal

    }
}
