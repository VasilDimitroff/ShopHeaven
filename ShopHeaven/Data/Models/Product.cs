using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Product : GuidModel, IBaseModel
    {
        public Product()
        {
            Ratings = new HashSet<Rating>();
            MainCategories = new HashSet<ProductsMainCategories>();
            SubCategories = new HashSet<ProductsSubCategories>();
            Images = new HashSet<Image>();
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

        [Required]
        public bool HasGuarantee { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public int ThumbnailId { get; set; }

        public virtual Image Thumbnail { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public virtual ICollection<ProductsMainCategories> MainCategories { get; set; }

        public virtual ICollection<ProductsSubCategories> SubCategories { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }
    }
}