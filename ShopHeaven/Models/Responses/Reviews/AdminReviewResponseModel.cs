namespace ShopHeaven.Models.Responses.Reviews
{
    public class AdminReviewResponseModel : ReviewResponseModel
    {
        public string Product { get; set; }

        public string Status { get; set; }

        public bool IsDeleted { get; set; }
    }
}
