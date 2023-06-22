using ShopHeaven.Models.Responses.Products.BaseModel;

namespace ShopHeaven.Models.Responses.Reviews
{
    public class AdminReviewResponseModel : ReviewResponseModel
    {

        public bool IsDeleted { get; set; }

        public ProductBaseResponseModel Product { get; set; }
    }
}
