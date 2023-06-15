using ShopHeaven.Models.Responses.Coupons;
using ShopHeaven.Models.Responses.ShippingMethods;
using ShopHeaven.Models.Responses.Payments;
using ShopHeaven.Models.Responses.ProductOrders;

namespace ShopHeaven.Models.Responses.Orders
{
    public class OrderResponseModel
    {
        public string Id { get; set; }

        public string Recipient { get; set; }

        public string Phone { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string? Details { get; set; }

        public decimal TotalPriceWithNoDiscount { get; set; }

        public decimal TotalPriceWithDiscount { get; set; }

        public decimal TotalPriceWithDiscountAndCoupon { get; set; }

        //it is the final price
        public decimal TotalPriceWithDiscountCouponAndShippingTax { get; set; }

        public CouponBaseResponseModel? Coupon { get; set; }

        public string Status { get; set; }

        public ShippingMethodResponseModel ShippingMethod { get; set; }

        public PaymentResponseModel Payment { get; set; }

        public string CreatedBy { get; set; }

        public string CreatedOn { get; set; }

        public bool IsDeleted { get; set; }

        public ICollection<ProductOrderResponseModel> Products { get; set; } // the products of the order
    }
}
