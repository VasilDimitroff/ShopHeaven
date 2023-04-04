using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Categories;

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

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                GetCategoryResponseModel categoryResponseModel = await this.categoriesService.GetCategoryById(id);

                if (categoryResponseModel == null)
                {
                    return BadRequest($"Searched category not found!");
                }

                return Ok(categoryResponseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
