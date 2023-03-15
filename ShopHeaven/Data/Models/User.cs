using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class User : IdentityUser, IDeletableModel, IBaseModel
    {
        public User()
        {
            Ratings = new HashSet<Rating>();
            Products = new HashSet<Product>();
            Images = new HashSet<Image>();
            MainCategories = new HashSet<MainCategory>();
            SubCategories = new HashSet<SubCategory>();
            Tags = new HashSet<Tag>();
            ProductsMainCategories = new HashSet<ProductMainCategory>();
            ProductsSubCategories = new HashSet<ProductSubCategory>();
            ProductsTags = new HashSet<ProductTag>();
        }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<Product> Products { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<Image> Images { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<MainCategory> MainCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<SubCategory> SubCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<Tag> Tags { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<ProductMainCategory> ProductsMainCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<ProductSubCategory> ProductsSubCategories { get; set; }

        [InverseProperty("CreatedBy")]
        public virtual ICollection<ProductTag> ProductsTags { get; set; }
    }
}