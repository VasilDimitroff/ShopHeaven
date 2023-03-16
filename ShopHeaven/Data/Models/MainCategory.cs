using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class MainCategory : BaseModel, ICreatableModel
    {
        public MainCategory()
        {
            SubCategories = new HashSet<SubCategory>();
            Products = new HashSet<ProductMainCategory>();
        }

        [Required(ErrorMessage = "Main Category name cannot be null or empty")]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("MainCategories")]
        public User CreatedBy { get; set; }

        public ICollection<SubCategory> SubCategories { get; set; } // this category has these subcategories
         
        public ICollection<ProductMainCategory> Products { get; set; } // this category contain these products
    }
}