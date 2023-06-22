namespace ShopHeaven.Models.Requests.Reviews
{
    public class PaginatedAdminReviewRequestModel : PaginationRequestModel
    {
        public string? Criteria { get; set; } // search by review property like product name, review author email etc.

        public string? Status { get; set; } // search by review status

        public string? UserId { get; set; } // get by user id
    }
}
