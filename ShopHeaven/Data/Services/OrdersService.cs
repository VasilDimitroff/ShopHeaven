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
        private readonly IPaymentService paymentService;
        private readonly IShippingService shippingService;

        public OrdersService(ShopDbContext db,
            ICartsService cartsService,
            IUsersService usersService,
            ICouponsService couponsService,
            IPaymentService paymentService,
            IShippingService shippingService)
        {
            this.db = db;
            this.cartsService = cartsService;
            this.usersService = usersService;
            this.couponsService = couponsService;
            this.paymentService = paymentService;
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
                OrderSummary = GetOrderSummary(cart, coupon),
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

        public async Task<OrderPaymentInfoResponseModel> RegisterOrderAsync(CreateOrderRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId)
            {
                throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts);
            }

            var cart = await this.cartsService.GetCartAsync(model.CartId);

            var coupon = new Coupon();

            if (model.CouponId != null)
            {
                coupon = await this.couponsService.GetCouponByIdAsync(model.CouponId);
            }

            if (string.IsNullOrWhiteSpace(model.Recipient)) { throw new ArgumentException(GlobalConstants.RecipientCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Phone)) { throw new ArgumentException(GlobalConstants.PhoneCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Country)) { throw new ArgumentException(GlobalConstants.CountryCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.City)) { throw new ArgumentException(GlobalConstants.CityCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Address)) { throw new ArgumentException(GlobalConstants.AddressCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.PaymentMethod)) { throw new ArgumentException(GlobalConstants.PaymentMethodCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.ShippingMethod)) { throw new ArgumentException(GlobalConstants.ShippingMethodCannotBeEmpty); }

            var shippingMethod = await this.shippingService.GetShippingMethodByNameAsync(model.ShippingMethod.Trim());

            var cartProducts = await this.cartsService.GetCartProductsAsync(model.CartId);

            var orderSummary = this.GetOrderSummary(cart, coupon);

            var newOrder = new Order
            {
                Recipient = model.Recipient.Trim(),
                Phone = model.Phone.Trim(),
                Country = model.Country.Trim(),
                City = model.City.Trim(),
                Address = model.Address.Trim(),
                Details = model.Details.Trim(),
                ShippingMethod = shippingMethod,
                CouponId = model.CouponId,
                CreatedById = model.UserId,
                TotalPriceWithNoDiscount = orderSummary.TotalPriceWithNoDiscount,
                TotalPriceWithDiscount = orderSummary.TotalPriceWithDiscountOfProducts,
                TotalPriceWithDiscountAndCoupon = orderSummary.TotalPriceWithAllDiscounts
            };

            var orderProducts = new List<ProductOrder>();

            foreach (var cartProduct in cartProducts)
            {
                var orderProduct = new ProductOrder
                {
                    Quantity = cartProduct.Quantity,
                    ProductId = cartProduct.ProductId,
                    OrderId = newOrder.Id,
                };

                orderProducts.Add(orderProduct);
            }

            var orderPayment = await this.paymentService
                .CreatePaymentAsync(newOrder.Id, 0, model.PaymentMethod.Trim());

            newOrder.PaymentId = orderPayment.Id;

            await this.db.ProductsOrders.AddRangeAsync(orderProducts);

            await this.db.Orders.AddAsync(newOrder);

            await this.db.SaveChangesAsync();

            //in this model is ok to apply shipping method
            var orderInfo = new OrderPaymentInfoResponseModel
            {
                Id = newOrder.Id,
                CouponAmount = orderSummary.CouponAmount,
                TotalPriceWithNoDiscount = orderSummary.TotalPriceWithNoDiscount,
                TotalPriceWithDiscountOfProducts = orderSummary.TotalPriceWithDiscountOfProducts,
            };

            return orderInfo;
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

        public OrderSummaryResponseModel GetOrderSummary(Cart cart, Coupon coupon)
        {
            return new OrderSummaryResponseModel
            {
                TotalPriceWithNoDiscount = cart.TotalPriceWithNoDiscount,
                TotalPriceWithDiscountOfProducts = cart.TotalPriceWithDiscount,
                CouponAmount = (decimal)coupon.Amount,
            };
        }
    }
}
