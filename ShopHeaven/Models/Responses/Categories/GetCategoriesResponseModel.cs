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

        public string Description { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }

        public IEnumerable<SubcategoriesResponseModel> Subcategories { get; set; }
    }
}
