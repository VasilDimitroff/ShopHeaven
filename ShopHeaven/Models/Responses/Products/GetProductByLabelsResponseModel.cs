using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Models.Responses.Products
{
    public class GetProductByLabelsResponseModel : GetProductByCriteriaBaseResponseModel
    {
        public CategoryBaseModel Category { get; set; }

        public SubcategoryBaseResponseModel Subcategory { get; set; }
    }
}
