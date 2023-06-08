using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoriesByCategoryIdResponseModel
    {
        public ICollection<SubcategoryMainInfoResponseModel> Subcategories { get; set; }

        public CategoryResponseModel Category { get; set; }

        public int ProductsCount { get; set; } // all products in main category
    }
}
