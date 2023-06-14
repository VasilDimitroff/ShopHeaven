using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IOrdersService
    {
        Task<CheckoutResponseModel> GetCheckoutInfoAsync(CheckoutRequestModel model);

        Task<Order> RegisterOrderAsync(CreateOrderRequestModel model);

        Task<OrderSummaryResponseModel> GetPaymentInfoAsync(CreateOrderRequestModel model);

        Task<ICollection<ProductOrder>> GetOrderProductsAsync(string orderId);

        Task<OrdersAndStatusesResponseModel> GetOrdersWithOrderStatusesAsync(OrderPaginationRequestModel model);

        Task ReduceQuantityOfProductsAsync(string orderId);
    }
}
