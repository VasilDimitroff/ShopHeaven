using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService ordersService;
        private readonly IPaymentService paymentService;
        private readonly ICurrencyService currencyService;
        private readonly StripeSettings stripeSettings;

        public OrdersController(
            IOrdersService ordersService,
            IPaymentService paymentService,
            ICurrencyService currencyService,
            IOptions<StripeSettings> stripeSettings)
        {
            this.stripeSettings = stripeSettings.Value;
            this.ordersService = ordersService;
            this.paymentService = paymentService;
            this.currencyService = currencyService;
        }

        [HttpPost, Authorize, Route(nameof(Checkout))]
        public async Task<ActionResult<CheckoutResponseModel>> Checkout([FromBody] CheckoutRequestModel model)
        {
            try
            {
                var checkoutInfo = await this.ordersService.GetCheckoutInfoAsync(model);
                return Ok(checkoutInfo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(CreateCheckoutSession))]
        public async Task<ActionResult> CreateCheckoutSession(CreateOrderRequestModel model)
        {
            try
            {
                var appCurrency = await this.currencyService.GetAppCurrencyAsync();
                var orderInfo = await this.ordersService.RegisterOrderAsync(model);
                Session session = await this.paymentService.CreateSessionAsync(orderInfo.Id, orderInfo.TotalPriceWithAllDiscounts, appCurrency.Code);
                Response.Headers.Add("Location", session.Url);

                return Ok(303);
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

                this.paymentService.ProcessPaymentResult(stripeEvent);

                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine("V CATHA");
                return BadRequest();
            }
        }     
    }
}
