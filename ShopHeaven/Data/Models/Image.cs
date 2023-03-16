using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Image : BaseModel, ICreatableModel
    {
        [Required]
        public string Url { get; set; }

        public string ProductId { get; set; }

        public Product Product { get; set; }

        public bool IsMainImage { get; set; } // if it is true, it is the main image of the product. Only 1 image can be main image

        [Required]
        public string CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Images")]
        public User CreatedBy { get; set; }

    }
}
