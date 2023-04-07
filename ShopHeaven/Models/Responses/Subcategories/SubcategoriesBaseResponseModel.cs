using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoriesBaseResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
