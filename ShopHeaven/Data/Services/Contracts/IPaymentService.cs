using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Orders;
using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IPaymentService
    {
        Task<Session> CreateSessionAsync(CreateOrderRequestModel model, decimal totalAmount, string appCurrencyCode);

        Task<Payment> CreatePaymentAsync(string orderId, decimal amount, string paymentMethod);

        void ProcessPaymentResult(Event stripeEvent);
    }
}
