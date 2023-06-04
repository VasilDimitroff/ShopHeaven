namespace ShopHeaven.Models.Responses.Reviews
{
    public class PaginatedReviewsResponseModel
    {
        public ICollection<ReviewResponseModel> Reviews { get; set; }

        public int ReviewsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
