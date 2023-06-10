using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Models.Requests.Carts;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet, Route(nameof(Checkout))]
        public async Task<ActionResult<int>> Checkout([FromQuery] DeleteProductFromCartRequestModel model)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
