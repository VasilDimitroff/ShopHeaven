using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Product : GuidModel, IBaseModel, ICreatableModel, IDeletableModel
    {
        public Product()
        {
            CreatedOn = DateTime.UtcNow;
            Reviews = new HashSet<Review>();
            MainCategories = new HashSet<ProductMainCategory>();
            SubCategories = new HashSet<ProductSubCategory>();
            Images = new HashSet<Image>();
            Reviews = new HashSet<Review>();
            Tags = new HashSet<ProductTag>();
        }

        [Required(ErrorMessage = "Product name must contain at least 2 characters")]
        [MinLength(2)]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Product description must contain at least 5 characters")]
        [MinLength(5)]
        [MaxLength(2000)]
        public string Description { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Brand { get; set; }

        public bool HasGuarantee { get; set; }

        public bool IsAvailable { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public double Rating => Math.Round(this.Reviews.Average(r => r.RatingValue), 2);

        //inverse property!
        public int ThumbnailId { get; set; }

        [ForeignKey(nameof(ThumbnailId))]
        public Image Thumbnail { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Products")]
        public User CreatedBy { get; set; }

        public ICollection<Image> Images { get; set; }

        public ICollection<Review> Reviews { get; set; }

        public ICollection<ProductMainCategory> MainCategories { get; set; }

        public ICollection<ProductSubCategory> SubCategories { get; set; }

        public ICollection<ProductTag> Tags { get; set; }
    }
}