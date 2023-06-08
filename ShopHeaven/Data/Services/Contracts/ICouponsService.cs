using ShopHeaven.Models.Requests.Coupons;
using ShopHeaven.Models.Responses.Coupons;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICouponsService
    {
        Task<CouponResponseModel> CreateCouponAsync(CreateCouponRequestModel model);

        Task<CouponResponseModel> EditCouponAsync(EditCouponRequestModel model);

        Task<CouponResponseModel> DeleteCouponAsync(DeleteCouponRequestModel model);

        Task<CouponResponseModel> UndeleteCouponAsync(UndeleteCouponRequestModel model);

        Task<ICollection<CouponResponseModel>> GetAllCouponsAsync();

        Task<CouponResponseModel> VerifyCouponAsync(string code);
    }
}
