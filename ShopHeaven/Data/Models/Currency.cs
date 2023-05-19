using System.ComponentModel.DataAnnotations;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Currency : BaseModel
    {
        public Currency()
        {
            Products = new HashSet<Product>();
        }

        [Required(ErrorMessage = "Code cannot be null or empty.")]
        [MinLength(1, ErrorMessage="Currency code must be at least 1 characters long")]
        public string Code { get; set; } // BGN for example

        [MinLength(1, ErrorMessage = "Currency name must be at least 1 characters long")]
        public string Name { get; set; } // Bulgarian Lev for example

        public ICollection<Product> Products { get; set; } // these product's price are in this currency
    }
}
