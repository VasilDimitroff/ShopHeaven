using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Products
{
    public class GetProductsByLabelRequestModel
    {
        [Required]
        public ICollection<string> Labels { get; set; }

        [Required]
        public int ProductsCount { get; set; }
    }
}
