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

        public async Task<CouponResponseModel> CreateCouponAsync(CouponRequestModel model)
        {
            if (model.Code.Length != GlobalConstants.CouponExactRequiredLength) throw new ArgumentException(GlobalConstants.CouponWrongLength);

            var targetCoupon = await this.db.Coupons.FirstOrDefaultAsync(x => x.Code.ToUpper() == model.Code.Trim().ToUpper() && x.IsDeleted != true);

            if (targetCoupon != null) throw new ArgumentException(GlobalConstants.CouponWithThisCodeAlreadyExist);

            if (model.Amount < 0) throw new ArgumentException(GlobalConstants.CouponAmountCannotBeNegativeNumber);

            var newCoupon = new Coupon
            {
                Amount = model.Amount,
                Code = model.Code.Trim().ToUpper(),
            };

            await this.db.Coupons.AddAsync(newCoupon);
            await this.db.SaveChangesAsync();

            int ordersCount = await GetCouponOrdersCountAsync(newCoupon);

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

        public async Task<CouponResponseModel> VerifyCouponAsync(string code)
        {
            var coupon = await this.ValidateCouponAsync(code);
            var ordersCount = await this.GetCouponOrdersCountAsync(coupon);

            var responseCoupon = new CouponResponseModel
            {
                Id = coupon.Id,
                Amount = coupon.Amount,
                Code = coupon.Code,
                OrdersCount = ordersCount
            };

            return responseCoupon;
        }

        private async Task<Coupon> ValidateCouponAsync(string code)
        {
            if (string.IsNullOrWhiteSpace(code) || code.Length != GlobalConstants.CouponExactRequiredLength)
            {
                throw new ArgumentException(GlobalConstants.CouponWrongLength);
            }

            var targetCoupon = await this.db.Coupons
               .FirstOrDefaultAsync(x => x.Code == code.Trim().ToUpper() && x.IsDeleted != true);

            if (targetCoupon == null)
            {
                throw new ArgumentException(GlobalConstants.CouponWithThisCodeDoesNotExist);
            }

            return targetCoupon;
        }

        private async Task<int> GetCouponOrdersCountAsync(Coupon coupon)
        {
            return await this.db.Orders
                .Where(x => x.CouponId == coupon.Id && x.IsDeleted != true)
                .CountAsync();
        }
    }
}
