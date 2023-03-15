using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Coupons : GuidModel, IBaseModel, IDeletableModel
    {
        [Required(ErrorMessage = "Code cannot be null or empty.")]
        [StringLength(8, ErrorMessage = "Code length must be 8 characters.")]
        public string Code { get; set; }

        public double Discount { get; set; } // in percent

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
