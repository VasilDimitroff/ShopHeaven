using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Images
{
    public class DeleteProductImageRequestModel
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}
