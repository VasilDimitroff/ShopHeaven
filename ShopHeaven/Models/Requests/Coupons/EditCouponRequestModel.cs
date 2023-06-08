using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Coupons
{
    public class EditCouponRequestModel
    {
        [Required(ErrorMessage = "Missing Coupon Id")]
        public string Id { get; set; }

        [Required, StringLength(8, ErrorMessage = "Code length must be exact 8 characters.")]
        public string Code { get; set; }

        [Required, Range(0, double.MaxValue)]
        public double Amount { get; set; }
    }
}
