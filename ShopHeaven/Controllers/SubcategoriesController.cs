﻿using Microsoft.AspNetCore.Authorization;
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

        [HttpPost, Authorize, Route(nameof(Create))]
        public async Task<ActionResult<SubcategoriesResponseModel>> Create([FromForm] CreateSubcategoryRequestModel model)
        {
            try
            {
                SubcategoriesResponseModel newSubcategory = await this.subcategoriesService.CreateSubcategoryAsync(model);
                return Ok(newSubcategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}