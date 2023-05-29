using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class ProductImage : BaseModel
    {
        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public string ImageId { get; set; }

        public Image Image { get; set; }

        public bool IsThumbnail { get; set; }
    }
}
