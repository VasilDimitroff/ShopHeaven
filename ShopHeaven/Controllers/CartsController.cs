using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(AddProduct))]
        public async Task<ActionResult<DeleteCategoryResponseModel>> AddProduct([FromBody] AddProductToCartRequestModel model)
        {
            try
            {
               // var deletedCategory = (DeleteCategoryResponseModel)await this.categoriesService.DeleteCategoryAsync(model, true);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
