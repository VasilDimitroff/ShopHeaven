using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Rating : GuidModel, IBaseModel, IDeletableModel
    {
        [Required]
        public int UserId { get; set; }

        public virtual User User { get; set; }

        [Required]
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        [Required]
        public int Value { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}