using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class UndeleteReviewRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
