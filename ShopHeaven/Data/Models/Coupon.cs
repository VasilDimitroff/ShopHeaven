using System.ComponentModel.DataAnnotations;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Coupon : BaseModel
    {
        public Coupon()
        {
            this.Orders = new HashSet<Order>();   
        }

        [Required(ErrorMessage = "Code cannot be null or empty.")]
        [StringLength(8, ErrorMessage = "Code length must be 8 characters.")]
        public string Code { get; set; }

        [Range(0, double.MaxValue)]
        public double Amount { get; set; } // in percent

        public ICollection<Order> Orders { get; set; } //coupon is applied to these orders
    }
}
