using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Coupons;
using ShopHeaven.Models.Responses.Coupons;

namespace ShopHeaven.Data.Services
{
    public class CouponsService : ICouponsService
    {
        private readonly ShopDbContext db;

        public CouponsService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task<CouponResponseModel> CreateCouponAsync(BaseCouponRequestModel model)
        {
            if (model.Code.Length != GlobalConstants.CouponExactRequiredLength)  throw new ArgumentException(GlobalConstants.CouponWrongLength);

            var targetCoupon = await this.db.Coupons.FirstOrDefaultAsync(x => x.Code.ToUpper() == model.Code.Trim().ToUpper() && x.IsDeleted != true);

            if (targetCoupon != null)  throw new ArgumentException(GlobalConstants.CouponWithThisCodeAlreadyExist);

            if (model.Amount < 0) throw new ArgumentException(GlobalConstants.CouponAmountCannotBeNegativeNumber);

            var newCoupon = new Coupon
            {
                Amount = model.Amount,
                Code = model.Code.Trim().ToUpper(), 
            };

            await this.db.Coupons.AddAsync(newCoupon);
            await this.db.SaveChangesAsync();

            var ordersCount = await this.db.Orders
                .Where(x => x.CouponId == newCoupon.Id && x.IsDeleted != true)
                .CountAsync();

            var responseCoupon = new CouponResponseModel
            {
                Id = newCoupon.Id,
                Amount = newCoupon.Amount,
                Code = newCoupon.Code,
                OrdersCount = ordersCount
            };

            return responseCoupon;
        }

        public async Task<ICollection<CouponResponseModel>> GetAllCouponsAsync()
        {
            var coupons = await this.db.Coupons
                .Where(x => x.IsDeleted != true)
                .Select(x => new CouponResponseModel
                {
                    Id = x.Id,
                    Amount = x.Amount,
                    Code = x.Code,
                    OrdersCount = x.Orders.Count()
                })
                .ToListAsync();

            return coupons;
        }
    }
}
