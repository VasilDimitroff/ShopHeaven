using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductMainCategory : BaseModel
    {
        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; }
    }
}
