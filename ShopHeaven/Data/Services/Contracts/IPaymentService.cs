using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Payments;
using ShopHeaven.Models.Responses.ShippingMethods;
using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IPaymentService
    {
        Task<Session> CreateSessionAsync(CreateOrderRequestModel model, decimal totalAmount, ShippingMethod shippingMethod, string appCurrencyCode);

        Task ProcessPaymentResultAsync(Event stripeEvent);

        Task<PaymentSessionResponseModel> GetPaymentSessionAsync(string id);
    }
}
