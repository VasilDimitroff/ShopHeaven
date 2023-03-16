using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductOrder : BaseModel
    {
        public int OrderId { get; set; }

        public Order Order { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}