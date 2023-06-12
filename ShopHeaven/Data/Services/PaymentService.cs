using Microsoft.Extensions.Options;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Data.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationSettings applicationSettings;
        private readonly ShopDbContext db;

        public PaymentService(ShopDbContext db, IOptions<ApplicationSettings> applicationSettings)
        {
            this.applicationSettings = applicationSettings.Value;
            this.db = db;
        }

        public async Task<Payment> CreatePaymentAsync(string orderId, decimal amount, string paymentMethod)
        {
            if (!ValidatePaymentMethod(paymentMethod.Trim())) { throw new ArgumentException(GlobalConstants.PaymentMethodIsInvalid); }

            var orderPayment = new Payment
            {
                OrderId = orderId,
                Amount = amount,
                PaymentMethod = (Models.Enums.PaymentMethod)Enum.Parse(typeof(Models.Enums.PaymentMethod), paymentMethod),
                IsCompleted = false,
            };
            
            await this.db.Payments.AddAsync(orderPayment);

            return orderPayment;
        }

        public async Task<Session> CreateSessionAsync(string orderId, decimal totalAmount, string appCurrencyCode)
        {

            totalAmount = Math.Round(totalAmount, 2);

            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmountDecimal = totalAmount * 100,
                            Currency = appCurrencyCode.ToLower(),
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
                Metadata = new Dictionary<string, string> {
                    { "orderId", orderId },
                }
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);
            return session;
        }

        public void ProcessPaymentResult(Event stripeEvent)
        {
            // + price for courier !!!!! in order creation - think about front end   

            if (stripeEvent.Type == Events.CheckoutSessionCompleted)
            {
                var session = stripeEvent.Data.Object as Session;
                var options = new SessionGetOptions();
                options.AddExpand("line_items");

                var service = new SessionService();

                // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
                Session sessionWithLineItems = service.Get(session.Id, options);
                StripeList<LineItem> lineItems = sessionWithLineItems.LineItems;

                var orderId = session.Metadata["orderId"];

                // reduce quantity of products 
                // empty cart
                // set payment do True for completed
                // update amount of payment
                // modifiedOn at payment
            }
        }

        private bool ValidatePaymentMethod(string method)
        {
            bool isPaymentMethodParsed = Enum.TryParse<Models.Enums.PaymentMethod>(method, out Models.Enums.PaymentMethod paymentMethod);

            return isPaymentMethodParsed;
        }
    }
}
