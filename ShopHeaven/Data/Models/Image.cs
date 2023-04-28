using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Image : BaseModel, ICreatableModel
    {
        public Image()
        {
            this.Categories = new HashSet<MainCategory>();
            this.SubCategories = new HashSet<SubCategory>();         
            this.Products = new HashSet<ProductImage>();         
        }

        [Required]
        public string Url { get; set; }

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Images")]
        public User CreatedBy { get; set; }

        public ICollection<MainCategory> Categories { get; set; } //categories which has this image as cover

        public ICollection<SubCategory> SubCategories { get; set; } //subcategories which has this image as cover

        public ICollection<ProductImage> Products { get; set; } //products which has this image as cover
    }
}
