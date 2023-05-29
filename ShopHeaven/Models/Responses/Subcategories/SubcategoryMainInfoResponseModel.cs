using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoryMainInfoResponseModel : SubcategoryBaseResponseModel
    {
        public string Description { get; set; }

        public string Image { get; set; }

        public int ProductsCount { get; set; } //products in this subcategory only

    }
}
