using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class PaginatedUserReviewRequestModel : PaginationRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Status { get; set; }

        public string? Criteria { get; set; }
    }
}
