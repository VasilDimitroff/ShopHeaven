using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Product : GuidModel, IBaseModel, ICreatableModel, IDeletableModel
    {
        public Product()
        {
            Ratings = new HashSet<Rating>();
            MainCategories = new HashSet<ProductMainCategory>();
            SubCategories = new HashSet<ProductSubCategory>();
            Images = new HashSet<Image>();
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

        public int ThumbnailId { get; set; }

        public virtual Image Thumbnail { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Products")]
        public virtual User CreatedBy { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public virtual ICollection<ProductMainCategory> MainCategories { get; set; }

        public virtual ICollection<ProductSubCategory> SubCategories { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }

        public virtual ICollection<ProductTag> Tags { get; set; }
    }
}