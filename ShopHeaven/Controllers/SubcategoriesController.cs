using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Subcategories;

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

        [HttpPost, Authorize, Route(nameof(Create))]
        public async Task<IActionResult> Create([FromForm] CreateSubcategoryRequestModel model)
        {
            try
            {
                await this.subcategoriesService.CreateSubcategoryAsync(model);
                return Ok($"Subcategory {model.Name} successfully created!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
