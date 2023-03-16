using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Cart : BaseModel
    {
        public Cart()
        {
            Products = new HashSet<ProductCart>();
        }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public decimal TotalPriceWithNoDiscount => Products.Sum(x => x.Product.Price * x.Quantity);

        public decimal TotalPriceWithDiscount => TotalPriceWithNoDiscount - Products.Sum(x => (x.Product.Discount * x.Product.Price) / 100);

        public ICollection<ProductCart> Products { get; set; } // this cart contains these products
    }
}
