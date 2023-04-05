using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class SubCategory : BaseModel, ICreatableModel
    {
        public SubCategory()
        {
            this.Products = new HashSet<Product>();
        }

        [Required(ErrorMessage = "SubCategory name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Image Id cannot be null or empty")]
        [ForeignKey("Image")]
        public string ImageId { get; set; }

        public Image Image { get; set; } // cover image

        [Required(ErrorMessage = "MainCategoryId cannot be null or empty")]
        public string MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; } // this is main category of the current category

        public ICollection<Product> Products { get; set; } // this subcategory contains these products

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("SubCategories")]
        public User CreatedBy { get; set; }
    }
}