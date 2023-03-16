using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductTag : BaseModel
    {
        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }

        public int CreatedById { get; set; }
    }
}
