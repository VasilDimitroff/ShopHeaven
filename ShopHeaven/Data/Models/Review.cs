using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Review : GuidModel, IBaseModel, IDeletableModel, ICreatableModel
    {
        public Review()
        {
            CreatedOn = DateTime.UtcNow;
        }

        [Required(ErrorMessage = "Please, enter a name")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Review content cannot be empty or null")]
        [MinLength(3)]
        public string Content { get; set; }

        [EmailAddress(ErrorMessage = "Please, enter a valid e-mail address")]
        public string Email { get; set; }

        public int ProductId { get; set; }

        public int RatingValue { get; set; }

        public Product Product { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        public User CreatedBy { get; set; }
    }
}
