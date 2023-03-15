using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class MainCategory : GuidModel, IBaseModel, ICreatableModel, IDeletableModel
    {
        public MainCategory()
        {
            CreatedOn = DateTime.UtcNow;
            SubCategories = new HashSet<SubCategory>();
            Products = new HashSet<ProductMainCategory>();
        }

        [Required(ErrorMessage = "Main Category name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("MainCategories")]
        public User CreatedBy { get; set; }

        public ICollection<SubCategory> SubCategories { get; set; }

        public ICollection<ProductMainCategory> Products { get; set; }
    }
}