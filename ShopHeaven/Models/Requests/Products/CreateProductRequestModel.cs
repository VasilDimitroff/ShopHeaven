using ShopHeaven.Models.Requests.Specifications;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Products
{
    public class CreateProductRequestModel
    {
        [Required(ErrorMessage = "Product name must contain at least 2 characters")]
        [MinLength(2)]
        public string Name { get; set; }

        public string Brand { get; set; }

        [MinLength(5)]
        [Required(ErrorMessage = "Product description must contain at least 5 characters")]
        public string Description { get; set; }

        public string CategoryId { get; set; }

        [Required]
        public string SubcategoryId { get; set; }

        [Required]
        public bool HasGuarantee { get; set; }

        [Required]
        public string CurrencyId { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public decimal Discount { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public ICollection<IFormFile> Images { get; set; }

        [Required]
        public ICollection<string> Tags { get; set; }

        public ICollection<string> Labels { get; set; }

        public ICollection<CreateSpecificationRequestModel> Specifications { get; set; }
    }
}
