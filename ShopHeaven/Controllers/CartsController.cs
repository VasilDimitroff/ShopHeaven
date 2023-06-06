using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Carts;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartsService cartsService;

        public CartsController(ICartsService cartsService)
        {
            this.cartsService = cartsService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(AddProduct))]
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

        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(GetProducts))]
        public async Task<ActionResult<CartProductResponseModel>> GetProducts([FromBody] GetCartProductsRequestModel model)
        {
            try
            {
                var productsInCart = await this.cartsService.GetCartProductsAsync(model);
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

        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(DeleteProduct))]
        public async Task<ActionResult<DeleteProductFromCartResponseModel>> DeleteProduct([FromBody] DeleteProductFromCartRequestModel model)
        {
            try
            {
                var deletedProductCartId = await this.cartsService.DeleteProductFromCartAsync(model);
                var cartSummary = await this.cartsService.GetCartTotalPriceAsync(model.CartId);
                var productsInCartCount = this.cartsService.GetProductsCountInCartAsync(model.CartId);

                var responseModel = new DeleteProductFromCartResponseModel
                {
                    ProductCartId = deletedProductCartId,
                    Summary = cartSummary,
                    CartProductsCount = productsInCartCount
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
