namespace ShopHeaven.Models.Responses.Orders
{
    public class OrderSummaryResponseModel
    {
        // regular price (db)
        public decimal TotalPriceWithNoDiscount { get; set; } 

        // regular price - sum of product discounts price (db)
        public decimal TotalPriceWithDiscountOfProducts { get; set; }

        // percent
        public decimal CouponAmount { get; set; }

        //nominal
        public decimal CouponDiscount => TotalPriceWithDiscountOfProducts * CouponAmount / 100;

        // price after all discounts (coupon included)
        public decimal TotalPriceWithAllDiscounts => TotalPriceWithDiscountOfProducts - CouponDiscount; 

        // nominal discount without coupon
        public decimal Discount => TotalPriceWithNoDiscount - TotalPriceWithDiscountOfProducts;

    }
}
