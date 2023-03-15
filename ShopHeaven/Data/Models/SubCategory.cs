using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class SubCategory : GuidModel, IBaseModel, ICreatableModel, IDeletableModel
    {
        public SubCategory()
        {
            this.Products = new HashSet<ProductSubCategory>();
        }

        [Required(ErrorMessage = "SubCategory name cannot be null or empty")]
        [MinLength(1)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public int MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; }

        public ICollection<ProductSubCategory> Products { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("SubCategories")]
        public virtual User CreatedBy { get; set; }
    }
}