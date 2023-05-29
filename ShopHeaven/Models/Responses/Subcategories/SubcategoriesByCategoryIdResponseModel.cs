using ShopHeaven.Models.Responses.Categories.BaseModel;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoriesByCategoryIdResponseModel
    {
        public ICollection<SubcategoryMainInfoResponseModel> Subcategories { get; set; }

        public CategoryBaseResponseModel Category { get; set; }

        public int ProductsCount { get; set; } // all products in main category
    }
}
