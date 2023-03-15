using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class ProductMainCategory: IBaseModel, ICreatableModel, IDeletableModel
    {
        public ProductMainCategory()
        {
            CreatedOn = DateTime.UtcNow;
        }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int MainCategoryId { get; set; }

        public MainCategory MainCategory { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("ProductsMainCategories")]
        public User CreatedBy { get; set; }
    }
}
