using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Models;
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
        [Route(nameof(Get))]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                GetCategoriesResponseModel categoryResponseModel = await this.categoriesService.GetCategoryByIdAsync(id);

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

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<GetCategoriesResponseModel> categoriesWithSubcategories = await this.categoriesService.GetAllCategoriesAsync();

                return Ok(categoriesWithSubcategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create([FromForm]CreateCategoryRequestModel model)
        {
            try
            {
                await this.categoriesService.CreateCategoryAsync(model);
                return Ok($"Category {model.Name} successfully created!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route(nameof(Delete))]
        public async Task<IActionResult> Delete([FromBody] DeleteCategoryRequestModel model)
        {
            try
            {
                var categoryName = await this.categoriesService.DeleteCategoryAsync(model);
                return Ok($"Category {categoryName} successfully deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
