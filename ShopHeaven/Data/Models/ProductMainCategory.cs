using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductMainCategory : BaseModel, IDeletableModel
    {
        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public string MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; }
    }
}
