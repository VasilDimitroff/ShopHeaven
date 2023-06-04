using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Carts;
using ShopHeaven.Models.Responses.Categories;

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
        public async Task<ActionResult<AddProductToCartResponseModel>> AddProduct([FromBody] AddProductToCartRequestModel model)
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

    }
}
