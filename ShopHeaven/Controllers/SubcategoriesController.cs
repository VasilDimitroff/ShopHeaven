using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Subcategories;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoriesController : ControllerBase
    {
        private readonly ISubcategoriesService subcategoriesService;

        public SubcategoriesController(ISubcategoriesService subcategoriesService)
        {
            this.subcategoriesService = subcategoriesService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<ActionResult<SubcategoryResponseModel>> Create([FromForm] CreateSubcategoryRequestModel model)
        {
            try
            {
                SubcategoryResponseModel newSubcategory = await this.subcategoriesService.CreateSubcategoryAsync(model);
                return Ok(newSubcategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<ActionResult<SubcategoryResponseModel>> Edit([FromForm] EditSubcategoryRequestModel model)
        {
            try
            {
                SubcategoryResponseModel updatedSubcategory = await this.subcategoriesService.EditSubcategoryAsync(model);
                return Ok(updatedSubcategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<ActionResult<DeleteSubcategoryResponseModel>> Delete([FromBody] BasicSubcategoryRequestModel model)
        {
            try
            {            
                var deletedSubcategory = (DeleteSubcategoryResponseModel) await this.subcategoriesService.DeleteSubcategoryAsync(model, true);
                return Ok(deletedSubcategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Undelete))]
        public async Task<ActionResult<UndeleteSubcategoryResponseModel>> Undelete([FromBody] UndeleteSubcategoryRequestModel model)
        {
            try
            {

                var undeletedSubcategory = (UndeleteSubcategoryResponseModel) await this.subcategoriesService.DeleteSubcategoryAsync(model, false);
                return Ok(undeletedSubcategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(ByCategoryId))]
        public async Task<ActionResult<List<SubcategoriesByCategoryIdResponseModel>>> ByCategoryId(SubcategorySummaryRequestModel model)
        {
            try
            {
                var subcategories = await this.subcategoriesService.GetSubcategoriesByCategoryId(model);
                return Ok(subcategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
