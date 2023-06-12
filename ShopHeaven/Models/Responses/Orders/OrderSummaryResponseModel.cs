namespace ShopHeaven.Models.Responses.Orders
{
    public class OrderSummaryResponseModel
    {
        public string CartId { get; set; }

        //1. regular price of products (db)
        public decimal TotalPriceWithNoDiscount { get; set; } 

        //2. sum of the product prices with their discount (db)
        public decimal TotalPriceWithDiscountOfProducts { get; set; }

        //3. Nominal discount without coupon applied
        public decimal Discount => TotalPriceWithNoDiscount - TotalPriceWithDiscountOfProducts;

        //4. Percent of discount of the coupon - it will apply discount on the TotalPriceWithDiscountOfProducts
        public decimal CouponAmount { get; set; }

        //5. Nominal amount of discount of the coupon
        public decimal CouponDiscount => TotalPriceWithDiscountOfProducts * CouponAmount / 100;

        //6. Nominal price after all discounts (coupon included)
        public decimal TotalPriceWithAllDiscounts => TotalPriceWithDiscountOfProducts - CouponDiscount;

        //7. Nominal Amount of shipping tax
        public decimal ShippingMethodAmount { get; set; }

        //8. it is the price for paying - with all discounts and included shipping tax
        public decimal FinalPrice => TotalPriceWithAllDiscounts + ShippingMethodAmount;

    }
}
