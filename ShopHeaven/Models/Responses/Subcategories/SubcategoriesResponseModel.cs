using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoriesResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }

        public int ProductsCount { get; set; }
    }
}
