using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Review : BaseModel, ICreatableModel
    {
        [Required(ErrorMessage = "Please, enter a name")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Review content cannot be empty or null")]
        [MinLength(3)]
        public string Content { get; set; }

        [EmailAddress(ErrorMessage = "Please, enter a valid e-mail address")]
        public string Email { get; set; }

        [Required]
        public string ProductId { get; set; }

        public int RatingValue { get; set; }

        public Product Product { get; set; }

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Reviews")]
        public User CreatedBy { get; set; }
    }
}