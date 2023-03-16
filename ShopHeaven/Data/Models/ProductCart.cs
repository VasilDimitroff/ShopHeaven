using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class ProductCart : BaseModel
    {
        [Required]
        public string CartId { get; set; }

        public Cart Cart { get; set; }

        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
