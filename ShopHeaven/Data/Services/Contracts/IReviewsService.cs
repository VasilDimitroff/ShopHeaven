using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Models.Requests.Reviews;
using ShopHeaven.Models.Responses.Reviews;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IReviewsService
    {
        Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(string productId, ReviewStatus status);

        Task<ReviewResponseModel> CreateReviewAsync(CreateReviewRequestModel model);
    }
}
