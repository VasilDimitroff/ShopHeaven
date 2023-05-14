using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Categories
{
    public class EditCategoryRequestModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }

        [Required]
        public string CreatedBy { get; set; }
    }
}
