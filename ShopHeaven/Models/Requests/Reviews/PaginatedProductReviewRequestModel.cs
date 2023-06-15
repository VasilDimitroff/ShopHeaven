namespace ShopHeaven.Models.Requests.Reviews
{
    public class PaginatedProductReviewRequestModel : PaginationRequestModel
    {
        public string ProductId { get; set; }

        public string Status { get; set; }
    }
}
