using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Models.Requests.Products;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<ActionResult> Create([FromForm] CreateProductRequestModel model)
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
