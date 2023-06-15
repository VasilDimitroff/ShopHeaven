using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class ChangeReviewStatusRequestModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
