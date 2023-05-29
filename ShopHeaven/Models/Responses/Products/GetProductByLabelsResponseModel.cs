using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Models.Responses.Products
{
    public class GetProductByLabelsResponseModel : GetProductByCriteriaBaseResponseModel
    {
        public CategoryBaseResponseModel Category { get; set; }

        public SubcategoryBaseResponseModel Subcategory { get; set; }
    }
}
