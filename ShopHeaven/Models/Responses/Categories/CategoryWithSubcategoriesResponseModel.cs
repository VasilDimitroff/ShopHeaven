using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Models.Responses.Categories
{
    public class CategoryWithSubcategoriesResponseModel : CategoryBaseResponseModel
    {
        public ICollection<SubcategoryBaseResponseModel> Subcategories { get; set; }
    }
}
