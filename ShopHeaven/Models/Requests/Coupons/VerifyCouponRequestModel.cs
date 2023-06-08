using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Coupons
{
    public class VerifyCouponRequestModel
    {
        [Required, StringLength(8)]
        public string Code { get; set; }
    }
}
