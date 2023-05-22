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
        public async Task<ActionResult<AdminProductResponseModel>> Create([FromForm] CreateProductRequestModel model)
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

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<ActionResult<AdminProductResponseModel>> Edit([FromForm] EditProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var updatedProduct = await this.productsService.EditProductAsync(model);
                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(GetAllWithCreationInfo))]
        public async Task<ActionResult<ProductsWithCreationInfoResponseModel>> GetAllWithCreationInfo()
        {
            try
            {
                var productsWithCategoriesAndCurrencies = await this.productsService.GetAllWithCreationInfoAsync();
                return Ok(productsWithCategoriesAndCurrencies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
