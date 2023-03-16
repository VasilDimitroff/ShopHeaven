using ShopHeaven.Data.Models.Common;
using ShopHeaven.Data.Models.Enums;

namespace ShopHeaven.Data.Models
{
    public class Payment : BaseModel
    {
        public int OrderId { get; set; }

        public Order Order { get; set; }

        public decimal Amount { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
    }
}
