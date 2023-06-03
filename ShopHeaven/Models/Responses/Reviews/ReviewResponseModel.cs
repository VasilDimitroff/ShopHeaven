namespace ShopHeaven.Models.Responses.Reviews
{
    public class ReviewResponseModel
    {
        public string Id { get; set; }

        public string Content { get; set; }

        public string Email { get; set; }

        public int RatingValue { get; set; }

        public string CreatedOn { get; set; }
    }
}
