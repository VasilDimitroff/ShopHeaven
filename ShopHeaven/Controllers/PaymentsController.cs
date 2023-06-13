using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Requests.Payments;
using ShopHeaven.Models.Responses.Payments;
using Stripe;
using Stripe.Checkout;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService paymentService;
        private readonly ICurrencyService currencyService;
        private readonly IOrdersService ordersService;
        private readonly IShippingService shippingService;
        private readonly StripeSettings stripeSettings;

        public PaymentsController(
            IPaymentService paymentService,
            ICurrencyService currencyService,
            IOrdersService ordersService,
            IShippingService shippingService,
            IOptions<StripeSettings> stripeSettings)
        {
            this.stripeSettings = stripeSettings.Value;
            this.paymentService = paymentService;
            this.currencyService = currencyService;
            this.ordersService = ordersService;
            this.shippingService = shippingService;
        }

        [HttpPost, Route(nameof(CreateCheckoutSession))]
        public async Task<ActionResult> CreateCheckoutSession(CreateOrderRequestModel model)
        {
            try
            {
                var appCurrency = await this.currencyService.GetAppCurrencyAsync();
                var orderInfo = await this.ordersService.GetPaymentInfoAsync(model);
                var shippingMethod = await this.shippingService.GetShippingMethodByNameAsync(model.ShippingMethod);

                // pass the price without shipping, not final price! Shipping will be added inside session
                Session session = await this.paymentService.CreateSessionAsync(model, orderInfo.TotalPriceWithAllDiscounts, shippingMethod, appCurrency.Code);
                Response.Headers.Add("Location", session.Url);

                return Ok(new { sessionId = session.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //case sensitive !!!!!
        [HttpPost, Route(nameof(OnPaymentCompleted))]
        public async Task<IActionResult> OnPaymentCompleted()
        {
            try
            {
                var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], this.stripeSettings.PaymentCompletedCallbackSecret, 300, false);

                await this.paymentService.ProcessPaymentResultAsync(stripeEvent);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(GetPaymentSession))]
        public async Task<ActionResult<PaymentSessionResponseModel>> GetPaymentSession(PaymentSessionRequestModel model)
        {
            try
            {
                var paymentSession = await this.paymentService.GetPaymentSessionAsync(model.Id);
                return Ok(paymentSession);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
