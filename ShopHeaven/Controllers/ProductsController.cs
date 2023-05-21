using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Products;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService productsService;

        public ProductsController(IProductsService productsService)
        {
            this.productsService = productsService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<ActionResult> Create([FromForm] CreateProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                await this.productsService.CreateProductAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
