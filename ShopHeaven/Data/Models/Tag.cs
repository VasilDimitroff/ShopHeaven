using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Tag : BaseModel, ICreatableModel
    {
        public Tag()
        {
            Products = new HashSet<ProductTag>();
        }

        [Required(ErrorMessage ="Tag name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Tags")]
        public User CreatedBy { get; set; }

        public ICollection<ProductTag> Products { get; set; } // this tag is added to these products
    }
}