using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class SubCategory : GuidModel, IBaseModel
    {
        public SubCategory()
        {
            this.Products = new HashSet<ProductsSubCategories>();
        }

        [Required(ErrorMessage = "SubCategory name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public int MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; }

        public ICollection<ProductsSubCategories> Products { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}