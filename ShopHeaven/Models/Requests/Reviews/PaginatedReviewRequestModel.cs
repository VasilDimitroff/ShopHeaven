using ShopHeaven.Data.Models.Enums;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class PaginatedReviewRequestModel : PaginationRequestModel
    {
        public string ProductId { get; set; }

        public string Status { get; set; }
    }
}
