using Microsoft.Extensions.Options;
using ShopHeaven.Data.Services.Contracts;
using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationSettings applicationSettings;

        public PaymentService(IOptions<ApplicationSettings> applicationSettings)
        {
            this.applicationSettings = applicationSettings.Value;
        }

        public async Task<Session> CreateSessionAsync()
        {
            //get all products from cart
            // with their quantity
            // with their regular price,
            // with their discount
            // get the coupon and apply it as discount

            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmountDecimal = Math.Round((Convert.ToDecimal(20.34) * 100), 2),
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"{GlobalConstants.SystemName} purchase",
                            },                          
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                SuccessUrl = $"{this.applicationSettings.ClientSPAUrl}/payment/success",
                CancelUrl = $"{this.applicationSettings.ClientSPAUrl}/payment/cancelled",
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);
            return session;
        }

        public void ProcessPaymentResult(Event stripeEvent)
        {
            if (stripeEvent.Type == Events.CheckoutSessionCompleted)
            {
                var session = stripeEvent.Data.Object as Session;
                var options = new SessionGetOptions();
                options.AddExpand("line_items");

                var service = new SessionService();

                // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
                Session sessionWithLineItems = service.Get(session.Id, options);
                StripeList<LineItem> lineItems = sessionWithLineItems.LineItems;

                // Create Order...
            }
        }
    }
}
