using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Image : BaseModel, ICreatableModel
    {
        [Required]
        public string Url { get; set; }

        [ForeignKey(nameof(Product))]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [ForeignKey(nameof(MainCategory))]
        public string MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; } // the image is cover of this main category

        [ForeignKey(nameof(SubCategory))]
        public string SubCategoryId { get; set; }

        public SubCategory SubCategory { get; set; } // the image is cover of this subcategory

        public bool IsMainImage { get; set; } // if it is true, it is the main image of the product. Only 1 image can be main image

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Images")]
        public User CreatedBy { get; set; }

    }
}
