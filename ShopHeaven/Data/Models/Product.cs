using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Product : BaseModel, ICreatableModel
    {
        private double _rating;

        public Product()
        {
            Reviews = new HashSet<Review>();
            Images = new HashSet<Image>();
            Reviews = new HashSet<Review>();
            Tags = new HashSet<ProductTag>();
            Carts = new HashSet<ProductCart>();
            Wishlists = new HashSet<ProductWishlist>();
            Labels = new HashSet<ProductLabel>();
            Specifications = new HashSet<Specification>();
        }

        [Required(ErrorMessage = "Product name must contain at least 2 characters")]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Product description must contain at least 5 characters")]
        public string Description { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Brand { get; set; }

        public bool HasGuarantee { get; set; }

        public int Quantity { get; set; }

        public bool IsAvailable { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; } // in percent

        [Required]
        public string SubCategoryId { get; set; }

        public SubCategory SubCategory { get; set; }

        public double Rating  { get => CalculateRating();  private set => _rating = value; }

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Products")]
        public User CreatedBy { get; set; }

        public ICollection<Image> Images { get; set; } // the product has these images

        public ICollection<Review> Reviews { get; set; } // the product has these reviews

        public ICollection<ProductTag> Tags { get; set; } // the product has these tags

        public ICollection<ProductCart> Carts { get; set; } // the product is presented in these carts

        public ICollection<ProductWishlist> Wishlists { get; set; } // the product is presented in these wishlists

        public ICollection<ProductOrder> Orders { get; set; } // the product is presented in these orders

        public ICollection<ProductLabel> Labels { get; set; } // the product is presented in these labels

        public ICollection<Specification> Specifications { get; set; } // the product has these specifications


        //calculate the rating of the product
        private double CalculateRating()
        {
            return Math.Round(this.Reviews.Average(r => r.RatingValue), 2);
        }
    }
}