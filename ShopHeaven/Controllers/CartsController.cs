using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Carts;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly ICartsService cartsService;

        public CartsController(ICartsService cartsService)
        {
            this.cartsService = cartsService;
        }

        [HttpPost, Route(nameof(AddProduct))]
        public async Task<ActionResult<AddProductToCartResponseModel>> AddProduct([FromBody]AddProductToCartRequestModel model)
        {
            try
            {
                var responseModel = await this.cartsService.AddProductToCartAsync(model);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(GetProducts))]
        public async Task<ActionResult<CartProductResponseModel>> GetProducts([FromBody] GetCartProductsRequestModel model)
        {
            try
            {
                var productsInCart = await this.cartsService.GetCartProductsFullInfoAsync(model);
                var cartSummary = await this.cartsService.GetCartTotalPriceAsync(model.CartId);

                var responseModel = new GetCartProductsResponseModel
                {
                    Products = productsInCart,
                    Summary = cartSummary
                };

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(DeleteProduct))]
        public async Task<ActionResult<DeleteProductFromCartResponseModel>> DeleteProduct([FromBody] DeleteProductFromCartRequestModel model)
        {
            try
            {
                await this.cartsService.DeleteProductFromCartAsync(model);
                var productsInCartCount = this.cartsService.GetProductsCountInCartAsync(model.CartId);
                var responseModel = new DeleteProductFromCartResponseModel { CartProductsCount = productsInCartCount };

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(ChangeProductQuantity))]
        public async Task<ActionResult<ChangeProductQuantityResponseModel>> ChangeProductQuantity([FromBody] ChangeProductQuantityRequestModel model)
        {
            try
            {
                var responseModel = await this.cartsService.ChangeProductQuantityAsync(model);

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
