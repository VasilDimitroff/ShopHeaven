using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Models.Responses.Categories
{
    public class CategoryNamesResponseModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IList<SubcategoryNamesResponseModel> Subcategories { get; set; }
    }
}
