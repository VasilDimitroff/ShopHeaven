namespace ShopHeaven.Models.Requests.Reviews
{
    public class CreateReviewRequestModel
    {
        public string Content { get; set; }

        public string ProductId { get; set; }

        public string UserId { get; set; }

        public int RatingValue { get; set; }
    }
}
