using ShopHeaven.Models.Responses.Categories.BaseModel;

namespace ShopHeaven.Models.Responses.Categories
{
    public class CategorySummaryInfoResponseModel : CategoryBaseResponseModel
    {
        public string Description { get; set; }

        public string Image { get; set; }

        public int SubcategoriesCount { get; set; }

        public int ProductsCount { get; set; }
    }
}
