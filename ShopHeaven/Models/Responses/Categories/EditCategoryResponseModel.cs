using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Categories
{
    public class EditCategoryResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }
    }
}
