using System.ComponentModel.DataAnnotations;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Coupon : BaseModel
    {
        [Required(ErrorMessage = "Code cannot be null or empty.")]
        [StringLength(8, ErrorMessage = "Code length must be 8 characters.")]
        public string Code { get; set; }

        public decimal Amount { get; set; } // in percent
    }
}
