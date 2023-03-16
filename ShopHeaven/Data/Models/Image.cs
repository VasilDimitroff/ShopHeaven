using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Image : BaseModel, ICreatableModel
    {
        [Required]
        public string Url { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Images")]
        public User CreatedBy { get; set; }

    }
}
