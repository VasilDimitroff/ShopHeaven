using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class DeleteReviewRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
