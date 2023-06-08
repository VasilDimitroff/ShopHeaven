using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Coupons
{
    public class UndeleteCouponRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
