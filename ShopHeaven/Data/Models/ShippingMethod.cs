using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ShippingMethod : BaseModel
    {
        public string Name { get; set; }

        public decimal ShippingAmount { get; set; }
    }
}
