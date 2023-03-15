using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class MainCategory : GuidModel, IBaseModel
    {
        public MainCategory()
        {
            SubCategories = new HashSet<SubCategory>();
            Products = new HashSet<ProductsMainCategories>();
        }

        [Required(ErrorMessage = "Main Category name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<SubCategory> SubCategories { get; set; }

        public virtual ICollection<ProductsMainCategories> Products { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}