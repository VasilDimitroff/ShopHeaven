using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Orders
{
    public class CreateOrderRequestModel
    {
        [Required]
        public string CartId { get; set; }

        [Required]
        public string UserId { get; set; }

        public string? CouponId { get; set; } = null;

        [Required]
        public string Recipient { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string ShippingMethod { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public string? Details { get; set; }
    }
}
