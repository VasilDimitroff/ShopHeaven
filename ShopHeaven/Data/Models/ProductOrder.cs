using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class ProductOrder : BaseModel
    {
        [Required]
        public string OrderId { get; set; }

        public Order Order { get; set; }

        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}