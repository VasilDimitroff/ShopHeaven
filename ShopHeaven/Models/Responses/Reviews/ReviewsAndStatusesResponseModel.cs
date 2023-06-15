namespace ShopHeaven.Models.Responses.Reviews
{
    public class ReviewsAndStatusesResponseModel
    {
        public ICollection<AdminReviewResponseModel> Reviews { get; set; }

        public ICollection<string> ReviewStatuses { get; set; }

        public int ReviewsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
