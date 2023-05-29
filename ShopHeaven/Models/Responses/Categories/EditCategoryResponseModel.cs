using ShopHeaven.Models.Responses.Categories.BaseModel;

namespace ShopHeaven.Models.Responses.Categories
{
    public class EditCategoryResponseModel : CategoryBaseResponseModel
    {
        public string Description { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }
    }
}
