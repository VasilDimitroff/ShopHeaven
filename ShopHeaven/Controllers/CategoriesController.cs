using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            this.categoriesService = categoriesService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromForm]CreateCategoryRequestModel model)
        {
            try
            {
                await this.categoriesService.CreateCategory(model);
                return Ok($"Category {model.Name} successfully created!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteCategoryRequestModel model)
        {
            try
            {
                var categoryName = await this.categoriesService.DeleteCategory(model);
                return Ok($"Category {categoryName} successfully deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
