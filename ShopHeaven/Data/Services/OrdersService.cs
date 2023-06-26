using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Enumerations;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Coupons;
using ShopHeaven.Models.Responses.Orders;
using ShopHeaven.Models.Responses.Payments;
using ShopHeaven.Models.Responses.ProductOrders;
using ShopHeaven.Models.Responses.ShippingMethods;

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

            var coupon = await PrepareCouponAsync(model.CouponId);

            ShippingMethod shippingMethod = new ShippingMethod();

            if (!string.IsNullOrWhiteSpace(model.ShippingMethod))
            {
                shippingMethod = await this.shippingService.GetShippingMethodByNameAsync(model.ShippingMethod.Trim());
            }

            var shippingMethods = await this.shippingService.GetShippingMethodsAsync();

            var paymentMethods = Enum.GetNames(typeof(Data.Models.Enums.PaymentMethod));

            var responseModel = new CheckoutResponseModel
            {
                OrderSummary = GetOrderSummary(cart, coupon, shippingMethod),
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

        public async Task<Order> RegisterOrderAsync(CreateOrderRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId) {  throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts); }

            var cart = await this.cartsService.GetCartAsync(model.CartId);

            var coupon = await PrepareCouponAsync(model.CouponId);

            ValidateFormData(model);

            var shippingMethod = await this.shippingService.GetShippingMethodByNameAsync(model.ShippingMethod.Trim());

            var cartProducts = await this.cartsService.GetCartProductsAsync(model.CartId);

            var orderSummary = this.GetOrderSummary(cart, coupon, shippingMethod);

            var order = await CreateOrderAsync(model, shippingMethod, cartProducts, orderSummary);

            return order;
        }

        public async Task<OrderSummaryResponseModel> GetPaymentInfoAsync(CreateOrderRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId)  {  throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts);  }

            var cart = await this.cartsService.GetCartAsync(model.CartId);

            var coupon = await PrepareCouponAsync(model.CouponId);

            ValidateFormData(model);

            var shippingMethod = await this.shippingService.GetShippingMethodByNameAsync(model.ShippingMethod.Trim());

            var orderSummary = this.GetOrderSummary(cart, coupon, shippingMethod);

            return orderSummary;
        }
 
        public async Task<ICollection<ProductOrder>> GetOrderProductsAsync(string orderId)
        {
            var orderProducts = await this.db.ProductsOrders
                .Include(x => x.Product)
                .Where(x => x.OrderId == orderId && x.IsDeleted != true)
                .ToListAsync();

            return orderProducts;
        }

        public async Task ReduceQuantityOfProductsAsync(string orderId)
        {
            //get order products by orderId
            var productOrders = await GetOrderProductsAsync(orderId);

            // reduce quantity of products 
            foreach (var productOrder in productOrders)
            {
                int reduceProductQuantityBy = productOrder.Quantity;

                productOrder.Product.Quantity -= reduceProductQuantityBy;
            }

            await this.db.SaveChangesAsync();
        }

        public async Task<OrdersAndStatusesResponseModel> GetOrdersWithOrderStatusesAsync(OrderPaginationRequestModel model)
        {
            var orderStatuses = this.GetOrderStatuses();
            var orders = await this.GetOrdersAsync(model);

            //get deleted orders too
            IQueryable<Order> allOrders = this.db.Orders.Include(x => x.CreatedBy);

            if (model.UserId != null && model.UserId != "")
            {
                allOrders = await FilterByUserIdAsync(allOrders, model.UserId);
            }

            allOrders = FilterByCriteria(allOrders, model.Criteria.Trim(), model.SearchTerm.Trim());
            var allFilteredOrdersCount = await FilterByOrderStatus(allOrders, model.Status.Trim()).CountAsync();

            var responseModel = new OrdersAndStatusesResponseModel
            {
                Orders = orders,
                OrderStatuses = orderStatuses,
                OrdersCount = allFilteredOrdersCount,
                PagesCount = (int)Math.Ceiling((double)allFilteredOrdersCount / model.RecordsPerPage),
            };

            return responseModel;
        }

        public async Task<ChangeOrderStatusResponseModel> ChangeOrderStatusAsync(ChangeOrderStatusRequestModel model)
        {
            //including deleted
            var order = await this.db.Orders.FirstOrDefaultAsync(x => x.Id == model.Id);

            if (order == null)
            {
                throw new ArgumentException(GlobalConstants.OrderNotFound);
            }

            bool isOrderStatusParsed = Enum.TryParse<OrderStatus>(model.Status.Trim(), out OrderStatus status);

            if (isOrderStatusParsed)
            {
                order.Status = status;
                await this.db.SaveChangesAsync();
            }

            var responseModel = new ChangeOrderStatusResponseModel
            {
                Id = order.Id,
                Status = order.Status.ToString()
            };

            return responseModel;
        }

        public async Task<OrderResponseModel> DeleteOrderAsync(DeleteOrderRequestModel model)
        {
            var order = await GetOrderByIdAsync(model.Id);

            if (order.IsDeleted)
            {
                throw new ArgumentException(GlobalConstants.OrderAlreadyDeleted);
            }

            foreach (var product in order.Products)
            {
                product.IsDeleted = true;
                product.DeletedOn = DateTime.UtcNow;
            }

            order.IsDeleted = true;
            order.DeletedOn = DateTime.UtcNow;
            order.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var responseModel = CreateOrderResponseModel(order);

            return responseModel;
        }

        public async Task<OrderResponseModel> UndeleteOrderAsync(UndeleteOrderRequestModel model)
        {
            var order = await GetOrderByIdAsync(model.Id);

            if (!order.IsDeleted)
            {
                throw new ArgumentException(GlobalConstants.OrderAlreadyUndeleted);
            }

            foreach (var product in order.Products)
            {
                product.IsDeleted = false;
                product.DeletedOn = null;
            }

            order.IsDeleted = false;
            order.DeletedOn = null;
            order.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var responseModel = CreateOrderResponseModel(order);

            return responseModel;
        }

        private OrderResponseModel CreateOrderResponseModel(Order order)
        {
            var responseModel = new OrderResponseModel
            {
                Id = order.Id,
                Recipient = order.Recipient,
                Phone = order.Phone,
                Country = order.Country,
                City = order.City,
                Address = order.Address,
                Details = order.Details,
                CreatedBy = order.CreatedBy.Email,
                Status = order.Status.ToString(),
                CreatedOn = order.CreatedOn.ToString(),
                IsDeleted = order.IsDeleted,
                TotalPriceWithDiscount = order.TotalPriceWithDiscount,
                TotalPriceWithNoDiscount = order.TotalPriceWithNoDiscount,
                TotalPriceWithDiscountAndCoupon = order.TotalPriceWithDiscountAndCoupon,
                TotalPriceWithDiscountCouponAndShippingTax = order.TotalPriceWithDiscountCouponAndShippingTax,
                Payment = new PaymentResponseModel
                {
                    Id = order.Payment.Id,
                    Amount = order.Payment.Amount,
                    IsCompleted = order.Payment.IsCompleted,
                    PaymentMethod = order.Payment.PaymentMethod.ToString(),
                },
                ShippingMethod = new ShippingMethodResponseModel
                {
                    Id = order.ShippingMethod.Id,
                    Name = order.ShippingMethod.Name,
                    Amount = order.ShippingMethod.ShippingAmount
                },
                Coupon = order.Coupon != null
                           ? new CouponBaseResponseModel
                           {
                               Code = order.Coupon.Code,
                               Amount = order.Coupon.Amount,
                           }
                           : null,
                Products = order.Products
                       .Where(p => p.IsDeleted != true)
                       .Select(p => new ProductOrderResponseModel
                       {
                           Id = p.Product.Id,
                           Name = p.Product.Name,
                           Quantity = p.Quantity,
                       })
                       .ToList(),
            };

            return responseModel;
        }

        private async Task<Order> GetOrderByIdAsync(string id)
        {
            var order = await this.db.Orders
               .Include(x => x.Products)
               .ThenInclude(x => x.Product)
               .Include(x => x.Payment)
               .Include(x => x.Coupon)
               .Include(x => x.ShippingMethod)
               .Include(x => x.CreatedBy)
               .FirstOrDefaultAsync(x => x.Id == id);

            if (order == null)
            {
                throw new ArgumentException(GlobalConstants.OrderNotFound);
            }

            return order;
        }

        private ICollection<string> GetOrderStatuses()
        {
            var orderStatuses = Enum.GetNames(typeof(OrderStatus));
            return orderStatuses;
        }

        private async Task<IQueryable<Order>> FilterByUserIdAsync(IQueryable<Order> orders, string userId)
        {
            var user = await this.usersService.GetUserAsync(userId);
            orders = orders.Where(x => x.CreatedById == userId && x.IsDeleted != true);

            return orders;
        }

        private IQueryable<Order> FilterByCriteria(IQueryable<Order> orders, string sortingCriteria, string searchTerm)
        {
            bool isSortCriteriaParsed = Enum.TryParse<OrderSortingCriteria>(sortingCriteria, out OrderSortingCriteria criteria);

            if (!isSortCriteriaParsed)
            {
                return orders;
            }

            switch (criteria)
            {
                case OrderSortingCriteria.Username:
                    return orders.Where(e => e.CreatedBy.UserName.ToLower().Contains(searchTerm.ToLower()));
                case OrderSortingCriteria.Email:
                    return orders.Where(e => e.CreatedBy.Email.ToLower().Contains(searchTerm.ToLower()));
                case OrderSortingCriteria.Recipient:
                    return orders.Where(e => e.Recipient.ToLower().Contains(searchTerm.ToLower()));
                case OrderSortingCriteria.ProductName:
                    return orders.Where(e => e.Products.Any(p => p.Product.Name.ToLower().Contains(searchTerm.ToLower())));
                default:
                    return orders;
            }
        }

        private IQueryable<Order> FilterByOrderStatus(IQueryable<Order> orders, string orderStatus)
        {
            bool isOrderStatusParsed = Enum.TryParse<OrderStatus>(orderStatus, out OrderStatus status);

            if (!isOrderStatusParsed)
            {
                return orders;
            }

            return orders.Where(e => e.Status == status);
        }

        private async Task<ICollection<OrderResponseModel>> GetOrdersAsync(OrderPaginationRequestModel model)
        {
            //get deleted included
            IQueryable<Order> orders = this.db.Orders.Include(x => x.CreatedBy);

            if (model.UserId != null && model.UserId != "")
            {
                orders = await FilterByUserIdAsync(orders, model.UserId);
            }

            orders = FilterByCriteria(orders, model.Criteria.Trim(), model.SearchTerm.Trim());
            orders = FilterByOrderStatus(orders, model.Status.Trim());

            var filteredOrders = await orders.OrderByDescending(x => x.CreatedOn)
               .Skip((model.Page - 1) * model.RecordsPerPage)
               .Take(model.RecordsPerPage)
               .Select(order => new OrderResponseModel
               {
                   Id = order.Id,
                   Recipient = order.Recipient,
                   Phone = order.Phone,
                   Country = order.Country,
                   City = order.City,
                   Address = order.Address,
                   Details = order.Details,
                   CreatedBy = order.CreatedBy.Email,
                   Status = order.Status.ToString(),
                   CreatedOn = order.CreatedOn.ToString(),
                   IsDeleted = order.IsDeleted,
                   TotalPriceWithDiscount = order.TotalPriceWithDiscount,
                   TotalPriceWithNoDiscount = order.TotalPriceWithNoDiscount,
                   TotalPriceWithDiscountAndCoupon = order.TotalPriceWithDiscountAndCoupon,
                   TotalPriceWithDiscountCouponAndShippingTax = order.TotalPriceWithDiscountCouponAndShippingTax,
                   Payment = new PaymentResponseModel
                   {
                       Id = order.Payment.Id,
                       Amount = order.Payment.Amount,
                       IsCompleted = order.Payment.IsCompleted,
                       PaymentMethod = order.Payment.PaymentMethod.ToString(),
                   },
                   ShippingMethod = new ShippingMethodResponseModel
                   {
                       Id = order.ShippingMethod.Id,
                       Name = order.ShippingMethod.Name,
                       Amount = order.ShippingMethod.ShippingAmount
                   },
                   Coupon = order.Coupon != null
                           ? new CouponBaseResponseModel
                           {
                               Code = order.Coupon.Code,
                               Amount = order.Coupon.Amount,
                           }
                           : null,
                   Products = order.Products
                       .Where(p => p.IsDeleted != true)
                       .Select(p => new ProductOrderResponseModel
                       {
                           Id = p.Product.Id,
                           Name = p.Product.Name,
                           Quantity = p.Quantity,
                       })
                       .ToList(),
               })
               .ToListAsync();

            return filteredOrders;
        }

        private async Task<Order> CreateOrderAsync(CreateOrderRequestModel model, ShippingMethod shippingMethod, ICollection<ProductCart> cartProducts, OrderSummaryResponseModel orderSummary)
        {
            var newOrder = new Order
            {
                Recipient = model.Recipient.Trim(),
                Phone = model.Phone.Trim(),
                Country = model.Country.Trim(),
                City = model.City.Trim(),
                Address = model.Address.Trim(),
                Details = model.Details.Trim(),
                ShippingMethod = shippingMethod,
                CouponId = model.CouponId.Trim() != string.Empty ? model.CouponId : null,
                CreatedById = model.UserId,
                TotalPriceWithNoDiscount = orderSummary.TotalPriceWithNoDiscount,
                TotalPriceWithDiscount = orderSummary.TotalPriceWithDiscountOfProducts,
                TotalPriceWithDiscountAndCoupon = orderSummary.TotalPriceWithAllDiscounts,
                TotalPriceWithDiscountCouponAndShippingTax = orderSummary.FinalPrice,
            };

            await CreateOrderProductsAsync(cartProducts, newOrder);

            var orderPayment = await this
                .CreatePaymentAsync(newOrder, model.PaymentMethod.Trim(), true);

            newOrder.PaymentId = orderPayment.Id;

            await this.db.Orders.AddAsync(newOrder);

            await this.db.SaveChangesAsync();

            return newOrder;
        }

        private async Task CreateOrderProductsAsync(ICollection<ProductCart> cartProducts, Order newOrder)
        {
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

            await this.db.ProductsOrders.AddRangeAsync(orderProducts);
        }

        private void ValidateFormData(CreateOrderRequestModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Recipient)) { throw new ArgumentException(GlobalConstants.RecipientCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Phone)) { throw new ArgumentException(GlobalConstants.PhoneCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Country)) { throw new ArgumentException(GlobalConstants.CountryCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.City)) { throw new ArgumentException(GlobalConstants.CityCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.Address)) { throw new ArgumentException(GlobalConstants.AddressCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.PaymentMethod)) { throw new ArgumentException(GlobalConstants.PaymentMethodCannotBeEmpty); }

            if (string.IsNullOrWhiteSpace(model.ShippingMethod)) { throw new ArgumentException(GlobalConstants.ShippingMethodCannotBeEmpty); }
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

        private OrderSummaryResponseModel GetOrderSummary(Cart cart, Coupon coupon, ShippingMethod shippingMethod)
        {
            return new OrderSummaryResponseModel
            {
                CartId = cart.Id,
                TotalPriceWithNoDiscount = cart.TotalPriceWithNoDiscount,
                TotalPriceWithDiscountOfProducts = cart.TotalPriceWithDiscount,
                CouponAmount = (decimal)coupon.Amount,
                ShippingMethodAmount = shippingMethod.ShippingAmount,
            };
        }

        private async Task<Payment> CreatePaymentAsync(Order order, string paymentMethod, bool isCompleted)
        {
            if (!ValidatePaymentMethod(paymentMethod.Trim())) { throw new ArgumentException(GlobalConstants.PaymentMethodIsInvalid); }

            var orderPayment = new Payment
            {
                OrderId = order.Id,
                IsCompleted = isCompleted,
                Amount = order.TotalPriceWithDiscountCouponAndShippingTax,
                PaymentMethod = (Models.Enums.PaymentMethod)Enum.Parse(typeof(Models.Enums.PaymentMethod), paymentMethod),
            };

            await this.db.Payments.AddAsync(orderPayment);

            return orderPayment;
        }

        private bool ValidatePaymentMethod(string method)
        {
            bool isPaymentMethodParsed = Enum.TryParse<Models.Enums.PaymentMethod>(method, out Models.Enums.PaymentMethod paymentMethod);

            return isPaymentMethodParsed;
        }

        private async Task<Coupon> PrepareCouponAsync(string couponId)
        {
            if (couponId == null || couponId.Trim() == "")
            {
                return new Coupon();
            }

            var coupon = await this.couponsService.GetCouponByIdAsync(couponId);

            return coupon;
        }
    }
}
