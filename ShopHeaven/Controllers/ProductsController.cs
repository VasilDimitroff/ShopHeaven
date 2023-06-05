using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Products;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService productsService;
        private readonly ICategoriesService categoriesService;

        public ProductsController(IProductsService productsService, ICategoriesService categoriesService)
        {
            this.productsService = productsService;
            this.categoriesService = categoriesService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<ActionResult<AdminProductResponseModel>> Create([FromForm] CreateProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {  
                var createdProduct = await this.productsService.CreateProductAsync(model);
                return Ok(createdProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(GetById))]
        public async Task<ActionResult<ProductWithSimilarProductsResponseModel>> GetById([FromBody] ProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var product = await this.productsService.GetProductByIdAsync(model);

                //to do: implement WHERE clause in GetSimilarProducts to fill with right products
                var similarProducts = await this.productsService.GetSimilarProductsByProductIdAsync(model);

                var productWithSimilarProductResponseModel = new ProductWithSimilarProductsResponseModel
                {
                    Product = product,
                    SimilarProducts = similarProducts,
                };

                return Ok(productWithSimilarProductResponseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<ActionResult<AdminProductResponseModel>> Edit([FromForm] EditProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var updatedProduct = await this.productsService.EditProductAsync(model);
                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(GetAllWithCreationInfo))]
        public async Task<ActionResult<ProductsWithCreationInfoResponseModel>> GetAllWithCreationInfo([FromBody]AdminProductPaginationRequestModel model)
        {
            try
            {
                List<AdminProductResponseModel> products = await this.productsService.GetAllAsync(model) as List<AdminProductResponseModel>;

                List<CategoryWithSubcategoriesResponseModel> categories = await this.categoriesService.GetAllCategoryNamesAsync();

                int productsCount = await this.productsService.GetProductsCount(model);

                var responseModel = new ProductsWithCreationInfoResponseModel
                {
                    Products = products,
                    Categories = categories,
                    ProductsCount = productsCount,
                    PagesCount = (int)Math.Ceiling((double)productsCount / model.RecordsPerPage)
                };

                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Route(nameof(GetBySubcategoryId))]
        public async Task<ActionResult<ProductsBySubcategoryResponseModel>> GetBySubcategoryId([FromBody] ProductPaginationRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var productsBySubcategoryId = await this.productsService.GetAllBySubcategoryIdAsync(model);
                return Ok(productsBySubcategoryId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Route(nameof(GetByLabels))]
        public async Task<ActionResult<List<GetProductByLabelsResponseModel>>> GetByLabels([FromBody] GetProductsByLabelRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var productsByLabels = await this.productsService.GetProductsByLabelsAsync(model);
                return Ok(productsByLabels);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<ActionResult<DeleteProductResponseModel>> Delete([FromBody] DeleteProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var deletedProduct = await this.productsService.DeleteProductAsync(model, true) as DeleteProductResponseModel;
                return Ok(deletedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        
        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Undelete))]
        public async Task<ActionResult<DeleteProductResponseModel>> Undelete([FromBody] UndeleteProductRequestModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var undeletedProduct =
                    await this.productsService.DeleteProductAsync(model, false) as UndeleteProductResponseModel;
                return Ok(undeletedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
