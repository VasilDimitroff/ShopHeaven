using ShopHeaven.Models.Requests.Reviews;
using ShopHeaven.Models.Responses.Reviews;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IReviewsService
    {
        Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(PaginatedProductReviewRequestModel model);

        Task<ReviewResponseModel> CreateReviewAsync(CreateReviewRequestModel model);

        Task<int> GetReviewsCountByProductIdAsync(string productId);

        Task<ReviewsAndStatusesResponseModel> GetReviewsWithReviewStatusesAsync(PaginatedAdminReviewRequestModel model);
    }
}
