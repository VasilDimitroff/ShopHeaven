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

        public async Task<CouponResponseModel> CreateCouponAsync(CreateCouponRequestModel model)
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

            return await CreateResponseModel(newCoupon);
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
                    OrdersCount = x.Orders
                        .Where(x => x.IsDeleted != true)
                        .Count()
                })
                .ToListAsync();

            return coupons;
        }

        public async Task<CouponResponseModel> VerifyCouponAsync(string code)
        {
            var coupon = await this.GetCouponByCodeAsync(code);

            return await CreateResponseModel(coupon);
        }

        public async Task<CouponResponseModel> EditCouponAsync(EditCouponRequestModel model)
        {
            if (model.Amount < 0) throw new ArgumentException(GlobalConstants.CouponAmountCannotBeNegativeNumber);

            var coupon = await GetCouponByIdAsync(model.Id);

            coupon.Amount = model.Amount;
            coupon.Code = model.Code.Trim().ToUpper();
            coupon.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            return await CreateResponseModel(coupon);
        }

        public async Task<CouponResponseModel> DeleteCouponAsync(DeleteCouponRequestModel model)
        {
            var coupon = await GetCouponByIdAsync(model.Id);

            coupon.IsDeleted = true;
            coupon.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            return await CreateResponseModel(coupon);
        }

        public async Task<CouponResponseModel> UndeleteCouponAsync(UndeleteCouponRequestModel model)
        {
            var coupon = await this.db.Coupons
            .FirstOrDefaultAsync(x => x.Id == model.Id && x.IsDeleted == true);

            if (coupon == null)
            {
                throw new ArgumentException(GlobalConstants.CouponWithThisIdDoesntExist);
            }

            coupon.IsDeleted = false;

            await this.db.SaveChangesAsync();

            return await CreateResponseModel(coupon);
        }

        private async Task<Coupon> GetCouponByCodeAsync(string code)
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

        private async Task<CouponResponseModel> CreateResponseModel(Coupon coupon)
        {
            var ordersCount = await this.db.Orders
                .Where(x => x.CouponId == coupon.Id && x.IsDeleted != true)
                .CountAsync(); ;

            var responseCoupon = new CouponResponseModel
            {
                Id = coupon.Id,
                Amount = coupon.Amount,
                Code = coupon.Code,
                OrdersCount = ordersCount
            };

            return responseCoupon;
        }

        private async Task<Coupon> GetCouponByIdAsync(string id)
        {
            var coupon = await this.db.Coupons
               .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (coupon == null)
            {
                throw new ArgumentException(GlobalConstants.CouponWithThisIdDoesntExist);
            }

            return coupon;
        }

    }
}
