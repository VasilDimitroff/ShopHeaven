using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class ProductTag : IBaseModel, ICreatableModel, IDeletableModel
    {
        public ProductTag()
        {
            CreatedOn = DateTime.UtcNow;
        }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("ProductsTags")]
        public User CreatedBy { get; set; }
    }
}
