using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Orders
{
    public class CheckoutRequestModel
    {
        [Required]
        public string CartId { get; set; }

        [Required]
        public string UserId { get; set; }

        public string? ShippingMethod { get; set; }

        public string? CouponId { get; set; } = null;
    }
}
