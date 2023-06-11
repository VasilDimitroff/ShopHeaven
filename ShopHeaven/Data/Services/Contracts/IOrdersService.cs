using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IOrdersService
    {
        Task<CheckoutResponseModel> GetCheckoutInfoAsync(CheckoutRequestModel model);

        Task CreateOrderAsync(CreateOrderRequestModel model);

        OrderSummaryResponseModel GetOrderSummary(Cart cart, Coupon coupon);
    }
}
