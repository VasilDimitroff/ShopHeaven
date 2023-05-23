using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Images;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Products;
using System.Data;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesService imagesService;

        public ImagesController(IImagesService imagesService)
        {
            this.imagesService = imagesService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<IActionResult> Delete([FromBody]DeleteProductImageRequestModel model)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                await this.imagesService.DeleteProductImageAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
