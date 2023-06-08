using ShopHeaven.Data.Models.Common;
using ShopHeaven.Data.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Payment : BaseModel
    {
        [Required]
        public string OrderId { get; set; }

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }

        public decimal Amount { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

        public bool IsCompleted { get; set; }
    }
}
