using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService ordersService;

        public OrdersController(IOrdersService ordersService)
        {
            this.ordersService = ordersService;
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

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(All))]
        public async Task<ActionResult<OrdersAndStatusesResponseModel>> All(OrderPaginationRequestModel model)
        {
            try
            {
                var orderStatuses = this.ordersService.GetOrderStatuses();
                var orders = await this.ordersService.GetOrdersAsync(model);

                var responseModel = new OrdersAndStatusesResponseModel
                {
                    Orders = orders,
                    OrderStatuses = orderStatuses,
                    PagesCount = 10,
                    OrdersCount = 100
                };

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
