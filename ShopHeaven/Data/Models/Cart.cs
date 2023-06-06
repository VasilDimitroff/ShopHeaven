using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Cart : BaseModel
    {
        private decimal _totalPriceWithDiscount;
        private decimal _totalPriceWithNoDiscount;

        public Cart()
        {
            Products = new HashSet<ProductCart>();
        }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public decimal TotalPriceWithNoDiscount { get; set; }

        public decimal TotalPriceWithDiscount { get; set; }

        public ICollection<ProductCart> Products { get; set; } // this cart contains these products

    }
}
