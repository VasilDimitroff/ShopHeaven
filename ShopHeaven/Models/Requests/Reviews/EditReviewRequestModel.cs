using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class EditReviewRequestModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
