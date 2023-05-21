using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Requests.Specifications;
using ShopHeaven.Models.Responses.Products;

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
        public async Task<ActionResult<CreateProductResponseModel>> Create([FromForm] CreateProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {  
                var createdProduct = await this.productsService.CreateProductAsync(model);
                return Ok(createdProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
