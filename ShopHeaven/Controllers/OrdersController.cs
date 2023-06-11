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

        //const string endpointSecret = "whsec_d72a89f3322b41d4ff9b7f480410167021339dd6e0c5e9acd6a3722abfa254a0";
        private readonly StripeSettings stripeSettings;
        public OrdersController(
            IOrdersService ordersService,
            IPaymentService paymentService,
            IOptions<StripeSettings> stripeSettings)
        {
            this.stripeSettings = stripeSettings.Value;
            this.ordersService = ordersService;
            this.paymentService = paymentService;
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

        [HttpPost, Authorize, Route(nameof(Create))]
        public async Task<ActionResult> Create([FromBody] CreateOrderRequestModel model)
        {
            try
            {
                await this.ordersService.CreateOrderAsync(model);
                //get products??
                //reduce products quantity
                // empty cart

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(CreateCheckoutSession))]
        public async Task<ActionResult> CreateCheckoutSession(CreateOrderRequestModel model)
        {
            Session session = await this.paymentService.CreateSessionAsync();
            Response.Headers.Add("Location", session.Url);

            return Ok(303);
        }

        //enter it with case sensitive !!!!!
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
