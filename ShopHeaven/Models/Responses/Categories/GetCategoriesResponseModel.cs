using System.ComponentModel.DataAnnotations;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Models.Responses.Categories
{
    public class GetCategoriesResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<SubcategoriesBaseResponseModel> Subcategories { get; set; }
    }
}
