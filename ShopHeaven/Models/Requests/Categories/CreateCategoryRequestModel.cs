using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Categories
{
    public class CreateCategoryRequestModel
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public IFormFile Image { get; set; }

        [Required]
        public string CreatedBy { get; set; }
    }
}
