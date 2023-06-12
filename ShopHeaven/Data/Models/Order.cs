using ShopHeaven.Data.Models.Common;
using ShopHeaven.Data.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Order : BaseModel, ICreatableModel
    {
        public Order()
        {
            this.Status = OrderStatus.Pending;
            this.Products = new HashSet<ProductOrder>();
        }

        [Required(ErrorMessage = "Recipient field cannot be null or empty")]
        public string Recipient { get; set; }

        [Required(ErrorMessage = "Please enter contact phone")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Country field cannot be null or empty")]
        public string Country { get; set; }

        [Required(ErrorMessage = "City field cannot be null or empty")]
        public string City { get; set; }

        [Required(ErrorMessage = "Address field cannot be null or empty")]
        public string Address { get; set; }

        public string? Details { get; set; }

        public decimal TotalPriceWithNoDiscount { get; set; }

        public decimal TotalPriceWithDiscount { get; set; }

        public decimal TotalPriceWithDiscountAndCoupon { get; set; }

        //it is the final price
        public decimal TotalPriceWithDiscountCouponAndShippingTax { get; set; }

        public string? CouponId { get; set; }

        public Coupon? Coupon { get; set; }

        public OrderStatus Status { get; set; }

        [Required]
        public string ShippingMethodId { get; set; }

        public ShippingMethod ShippingMethod { get; set; }

        public string? PaymentId { get; set; }

        public Payment? Payment { get; set; }

        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Orders")]
        public User CreatedBy { get; set; }

        public ICollection<ProductOrder> Products { get; set; } // this order contain these products
    }
}