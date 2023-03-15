using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Tag : GuidModel, IBaseModel, IDeletableModel, ICreatableModel
    {
        public Tag()
        {
            CreatedOn = DateTime.UtcNow;
            Products = new HashSet<ProductTag>();
        }

        [Required(ErrorMessage ="Tag name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("Tags")]
        public User CreatedBy { get; set; }

        public ICollection<ProductTag> Products { get; set; }
    }
}
