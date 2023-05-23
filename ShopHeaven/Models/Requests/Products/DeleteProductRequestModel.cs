using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Products
{
    public class DeleteProductRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
