using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Coupons
{
    public class DeleteCouponRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
