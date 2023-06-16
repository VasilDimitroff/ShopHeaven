using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Wishlists;
using ShopHeaven.Models.Responses.Wishlists;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistsController : ControllerBase
    {
        private readonly IWishlistsService wishlistsService;

        public WishlistsController(IWishlistsService wishlistsService)
        {
            this.wishlistsService = wishlistsService;
        }

        [HttpPost, Route(nameof(AddProduct))]
        public async Task<ActionResult<AddProductToWishlistResponseModel>> AddProduct([FromBody] AddProductToWishlistRequestModel model)
        {
            try
            {
                 var addProductResponseModel = await this.wishlistsService.AddProductToWishlistAsync(model);
                return Ok(addProductResponseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(DeleteProduct))]
        public async Task<ActionResult<DeleteProductFromWishlistResponseModel>> DeleteProduct([FromBody] DeleteProductFromWishlistRequestModel model)
        {
            try
            {
                var deleteProductFromWishlistResponseModel = await this.wishlistsService.DeleteProductFromWishlistAsync(model);
                return Ok(deleteProductFromWishlistResponseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
