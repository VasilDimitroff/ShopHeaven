using Microsoft.AspNetCore.Identity;
using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;
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
            Orders = new HashSet<Order>();
        }

        [Required]
        public string CartId { get; set; }

        public Cart Cart { get; set; }

        [Required]
        public string WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }

        public string RefreshToken { get; set; }

        public DateTime TokenCreated { get; set; }

        public DateTime TokenExpires { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [InverseProperty("CreatedBy")]
        public ICollection<Review> Reviews { get; set; } // user is created these reviews

        [InverseProperty("CreatedBy")]
        public ICollection<Image> Images { get; set; } // user is uploaded these images

        [InverseProperty("CreatedBy")]
        public ICollection<Product> Products { get; set; } // user is created these products

        [InverseProperty("CreatedBy")]
        public ICollection<MainCategory> MainCategories { get; set; } // user is created these main categories

        [InverseProperty("CreatedBy")]
        public ICollection<SubCategory> SubCategories { get; set; } // user is created these subcategories

        [InverseProperty("CreatedBy")]
        public ICollection<Tag> Tags { get; set; } // user is created these tags

        [InverseProperty("CreatedBy")] 
        public ICollection<Order> Orders { get; set; } // user is created these orders
    }
}