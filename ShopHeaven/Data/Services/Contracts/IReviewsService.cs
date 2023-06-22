using ShopHeaven.Models.Requests.Reviews;
using ShopHeaven.Models.Responses.Reviews;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IReviewsService
    {
        Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(PaginatedProductReviewRequestModel model);

        Task<ReviewResponseModel> CreateReviewAsync(CreateReviewRequestModel model);

        Task<AdminReviewResponseModel> EditReviewAsync(EditReviewRequestModel model);

        Task<int> GetReviewsCountByProductIdAsync(string productId);

        Task<ReviewsAndStatusesResponseModel> GetReviewsWithReviewStatusesAsync(PaginatedAdminReviewRequestModel model);

        Task<ChangeReviewStatusResponseModel> ChangeReviewStatusAsync(ChangeReviewStatusRequestModel model);

        Task<AdminReviewResponseModel> DeleteReviewAsync(DeleteReviewRequestModel model);

        Task<AdminReviewResponseModel> UndeleteReviewAsync(UndeleteReviewRequestModel model);
    }
}
