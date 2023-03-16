using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Product : BaseModel, ICreatableModel
    {
        public Product()
        {
            Reviews = new HashSet<Review>();
            MainCategories = new HashSet<ProductMainCategory>();
            SubCategories = new HashSet<ProductSubCategory>();
            Images = new HashSet<Image>();
            Reviews = new HashSet<Review>();
            Tags = new HashSet<ProductTag>();
            Carts = new HashSet<ProductCart>();
            Wishlists = new HashSet<ProductWishlist>();
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

        public decimal Discount { get; set; } // in percent

        public double Rating => Math.Round(this.Reviews.Average(r => r.RatingValue), 2);

        public int ThumbnailId { get; set; }

        [ForeignKey(nameof(ThumbnailId))]
        public Image Thumbnail { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Products")]
        public User CreatedBy { get; set; }

        public ICollection<Image> Images { get; set; } // the product has these images

        public ICollection<Review> Reviews { get; set; } // the product has these reviews

        public ICollection<ProductMainCategory> MainCategories { get; set; } // the product is in these maincategories

        public ICollection<ProductSubCategory> SubCategories { get; set; } // the product is in these subcategories

        public ICollection<ProductTag> Tags { get; set; } // the product has these tags

        public ICollection<ProductCart> Carts { get; set; } // the product is presented in these carts

        public ICollection<ProductWishlist> Wishlists { get; set; } // the product is presented in these wishlists

        public ICollection<ProductOrder> Orders { get; set; } // the product is presented in these orders
    }
}