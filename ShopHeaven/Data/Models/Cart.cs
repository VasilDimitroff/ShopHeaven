using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Cart : BaseModel
    {
        public Cart()
        {
            Products = new HashSet<ProductCart>();
        }

        public int UserId { get; set; }

        public User User { get; set; }

        public decimal TotalPriceWithNoDiscount => Products.Sum(x => x.Product.Price * x.Quantity);

        public decimal TotalPriceWithDiscount => TotalPriceWithNoDiscount - Products.Sum(x => (x.Product.Discount * x.Product.Price) / 100);

        public ICollection<ProductCart> Products { get; set; } // this cart contains these products
    }
}
