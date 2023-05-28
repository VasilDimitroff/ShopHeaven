using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Requests.Categories;
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

        [HttpGet, Route(nameof(GetAll))]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<GetCategoriesResponseModel> categoriesWithSubcategories = 
                    await this.categoriesService.GetAllCategoriesAsync();

                return Ok(categoriesWithSubcategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route(nameof(GetCategoryNames))]
        public async Task<IActionResult> GetCategoryNames()
        {
            try
            {
                var categoriesWithSubcategories =
                    await this.categoriesService.GetAllCategoryNamesAsync();

                return Ok(categoriesWithSubcategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route(nameof(GetCategoriesSummary))]
        public async Task<ActionResult<List<CategorySummaryInfoResponseModel>>> GetCategoriesSummary()
        {
            try
            {
                var categories =
                    await this.categoriesService.GetCategoriesSummaryInfoAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<IActionResult> Edit([FromForm] EditCategoryRequestModel model)
        {
            try
            {
                var editedCategory = await this.categoriesService.EditCategoryAsync(model);

                return Ok(editedCategory);
            }
            catch (Exception ex)
            {
                ;
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<IActionResult> Create([FromForm]CreateCategoryRequestModel model)
        {
            try
            {
                var newCategory = await this.categoriesService.CreateCategoryAsync(model);
                return Ok(newCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<ActionResult<DeleteCategoryResponseModel>> Delete([FromBody] DeleteCategoryRequestModel model)
        {
            try
            {
                var deletedCategory = (DeleteCategoryResponseModel) await this.categoriesService.DeleteCategoryAsync(model, true);
                return Ok(deletedCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Undelete))]
        public async Task<ActionResult<UndeleteCategoryResponseModel>> Undelete([FromBody] UndeleteCategoryRequestModel model)
        {
            try
            {
                var undeletedCategory = (UndeleteCategoryResponseModel) await this.categoriesService.DeleteCategoryAsync(model, false);
                return Ok(undeletedCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
