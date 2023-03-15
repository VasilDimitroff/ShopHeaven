using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Product : GuidModel, IBaseModel
    {
        public Product()
        {
            Ratings = new HashSet<Rating>();
            MainCategories = new HashSet<ProductsMainCategories>();
            SubCategories = new HashSet<ProductsSubCategories>();
        }

        [Required]
        [MinLength(2)]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(2000)]
        public string Description { get; set; }

        [MinLength(1)]
        [MaxLength(100)]
        public string Brand { get; set; }

        public bool HasGuarantee { get; set; }

        public bool IsAvailable { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int MainCategoryId { get; set; }

        public virtual ICollection<ProductsMainCategories> MainCategories { get; set; }

        public virtual ICollection<ProductsSubCategories> SubCategories { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }
    }
}
