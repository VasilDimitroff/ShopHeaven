using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class User : IdentityUser, IDeletableModel, IBaseModel
    {
        public User()
        {
            CreatedOn = DateTime.UtcNow;
            Reviews = new HashSet<Review>();
            Products = new HashSet<Product>();
            Images = new HashSet<Image>();
            MainCategories = new HashSet<MainCategory>();
            SubCategories = new HashSet<SubCategory>();
            Tags = new HashSet<Tag>();
            ProductsMainCategories = new HashSet<ProductMainCategory>();
            ProductsSubCategories = new HashSet<ProductSubCategory>();
            ProductsTags = new HashSet<ProductTag>();
        }

        public int CartId { get; set; }

        public Cart Cart { get; set; }

        public int WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public ICollection<Review> Reviews { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<Image> Images { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<Product> Products { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<MainCategory> MainCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<SubCategory> SubCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<ProductMainCategory> ProductsMainCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<ProductSubCategory> ProductsSubCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<Tag> Tags { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<ProductTag> ProductsTags { get; set; }
    }
}