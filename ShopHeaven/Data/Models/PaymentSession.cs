using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class PaymentSession
    {
        public PaymentSession()
        {
            CreatedOn = DateTime.UtcNow;
            IsDeleted = false;
        }

        [Required]
        public string Id { get; set; }

        public bool IsSuccessful { get; set; }

        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("PaymentSessions")]
        public User CreatedBy { get; set; }

        public string? PaymentId { get; set; }

        [ForeignKey(nameof(PaymentId))]
        public Payment? Payment { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
