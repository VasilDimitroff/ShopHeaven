using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Subcategories
{
    public class CreateSubcategoryRequestModel
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public IFormFile Image { get; set; }

        [Required]
        public string CategoryId { get; set; }

        [Required]
        public string CreatedBy { get; set; }
    }
}
