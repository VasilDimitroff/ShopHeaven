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

        public decimal TotalPriceWithNoDiscount  { get => CalculatePriceWithNoDiscount(); private set => _totalPriceWithNoDiscount = value; }

        public decimal TotalPriceWithDiscount  { get => CalculatePriceWithDiscount(); private set => _totalPriceWithDiscount = value; }

        public ICollection<ProductCart> Products { get; set; } // this cart contains these products

        private decimal CalculatePriceWithNoDiscount()
         {
                return this.Products.Sum(x => x.Product.Price * x.Quantity);
         }

        private decimal CalculatePriceWithDiscount()
        {
            return  TotalPriceWithNoDiscount - this.Products.Sum(x => (x.Product.Discount * x.Product.Price) / 100);
        }
    }
}
