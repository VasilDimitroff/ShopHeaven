using ShopHeaven.Data.Models.Enums;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class ProductPaginatedReviewRequestModel : PaginationRequestModel
    {
        public string ProductId { get; set; }

        public ReviewStatus Status { get; set; }
    }
}
