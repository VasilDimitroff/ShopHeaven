using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IOrdersService
    {
        Task<CheckoutResponseModel> GetCheckoutInfoAsync(CheckoutRequestModel model);

        Task<OrderSummaryResponseModel> RegisterOrderAsync(CreateOrderRequestModel model);

        Task<OrderSummaryResponseModel> GetPaymentInfo(CreateOrderRequestModel model);
    }
}
