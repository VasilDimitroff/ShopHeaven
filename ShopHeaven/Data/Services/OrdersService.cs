using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Data.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly ShopDbContext db;
        private readonly ICartsService cartsService;
        private readonly IUsersService usersService;
        private readonly ICouponsService couponsService;
        private readonly IShippingService shippingService;

        public OrdersService(ShopDbContext db,
            ICartsService cartsService,
            IUsersService usersService,
            ICouponsService couponsService,
            IShippingService shippingService)
        {
            this.db = db;
            this.cartsService = cartsService;
            this.usersService = usersService;
            this.couponsService = couponsService;
            this.shippingService = shippingService;
        }

        public async Task<CheckoutResponseModel> GetCheckoutInfoAsync(CheckoutRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId)
            {
                throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts);
            }

            var cart = await this.cartsService.GetCartAsync(model.CartId);

            Coupon coupon = new Coupon();

            if (model.CouponId != null)
            {
                coupon = await this.couponsService.GetCouponByIdAsync(model.CouponId);
            }

            var shippingMethods = await this.shippingService.GetShippingMethodsAsync();

            var paymentMethods = Enum.GetNames(typeof(PaymentMethod));

            var responseModel = new CheckoutResponseModel
            {
                OrderSummary = new OrderSummaryResponseModel
                {
                    TotalPriceWithNoDiscount = cart.TotalPriceWithNoDiscount,
                    TotalPriceWithDiscountOfProducts = cart.TotalPriceWithDiscount,
                    CouponAmount = (decimal)coupon.Amount,
                },
                ShippingMethods = shippingMethods,
                PaymentMethods = paymentMethods
            };

            var lastUserOrder = await GetLastOrderAsync(user.Id);

            if (lastUserOrder != null)
            {
                responseModel.Recipient = lastUserOrder.Recipient;
                responseModel.Address = lastUserOrder.Address;
                responseModel.Phone = lastUserOrder.Phone;
                responseModel.Country = lastUserOrder.Country;
                responseModel.City = lastUserOrder.City;
            }

            return responseModel;
        }

        private async Task<Order> GetLastOrderAsync(string userId)
        {
            var user = await this.usersService.GetUserAsync(userId);

            var lastOrder = await this.db.Orders
                    .OrderByDescending(x => x.CreatedOn)
                    .Include(x => x.Coupon)
                    .Include(x => x.ShippingMethod)
                    .Include(x => x.Products)
                    .Where(x => x.CreatedById == userId && x.IsDeleted != true)
                    .FirstOrDefaultAsync();

            return lastOrder;
        }
    }
}
