namespace ShopHeaven.Models.Requests.Reviews
{
    public class CreateReviewRequestModel
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Comment { get; set; }

        public string ProductId { get; set; }

        public string UserId { get; set; }

        public int RatingValue { get; set; }
    }
}
