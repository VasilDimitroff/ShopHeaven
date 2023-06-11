using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IPaymentService
    {
        Task<Session> CreateSessionAsync();

        void ProcessPaymentResult(Event stripeEvent);
    }
}
