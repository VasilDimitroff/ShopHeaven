using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Models.Responses.Categories
{
    public class GetCategoriesResponseModel : CategoryBaseResponseModel
    {
        public string Description { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }

        public IEnumerable<SubcategoryResponseModel> Subcategories { get; set; }
    }
}
