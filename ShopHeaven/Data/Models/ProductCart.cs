using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductCart : BaseModel
    {
        public int CartId { get; set; }

        public Cart Cart { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
