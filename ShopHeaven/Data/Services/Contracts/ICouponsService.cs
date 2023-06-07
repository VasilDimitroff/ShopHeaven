using ShopHeaven.Models.Requests.Coupons;
using ShopHeaven.Models.Responses.Coupons;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICouponsService
    {
        Task<CouponResponseModel> CreateCouponAsync(BaseCouponRequestModel model);

        Task<ICollection<CouponResponseModel>> GetAllCouponsAsync();
    }
}
