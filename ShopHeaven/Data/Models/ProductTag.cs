using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductTag : BaseModel
    {
        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public string TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
