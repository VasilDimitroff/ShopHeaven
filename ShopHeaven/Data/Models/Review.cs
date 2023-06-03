using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;
using ShopHeaven.Data.Models.Enums;

namespace ShopHeaven.Data.Models
{
    public class Review : BaseModel, ICreatableModel
    {
        public Review()
        {
            this.Status = ReviewStatus.Approved;
        }

        [Required(ErrorMessage = "Review content must contain at least 2 characters")]
        public string Content { get; set; }

        [Required]
        public string ProductId { get; set; }
     
        public Product Product { get; set; }

        public int RatingValue { get; set; }

        [Required]
        public ReviewStatus Status { get; set; }

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Reviews")]
        public User CreatedBy { get; set; }
    }
}