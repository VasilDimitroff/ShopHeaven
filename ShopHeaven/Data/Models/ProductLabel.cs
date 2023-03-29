using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class ProductLabel : BaseModel
    {
        [Required]
        public string LabelId { get; set; }

        public Label Label { get; set; }

        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }
    }
}
