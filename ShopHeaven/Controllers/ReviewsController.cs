using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Requests.Reviews;
using ShopHeaven.Models.Responses.Orders;
using ShopHeaven.Models.Responses.Reviews;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewsService reviewsService;

        public ReviewsController(IReviewsService reviewsService)
        {
            this.reviewsService = reviewsService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(Create))]
        public async Task<ActionResult<ReviewResponseModel>> Create([FromBody] CreateReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                 var createdReview = await this.reviewsService.CreateReviewAsync(model);
                return Ok(createdReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(AllByProductId))]
        public async Task<ActionResult<PaginatedReviewsResponseModel>> AllByProductId([FromBody] PaginatedProductReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var paginatedProductReviews = await this.reviewsService.GetReviewsByProductIdAsync(model);
                var totalReviewsCount = await this.reviewsService.GetReviewsCountByProductIdAsync(model.ProductId);

                var reviewsInfoModel = new PaginatedReviewsResponseModel
                {
                    Reviews = paginatedProductReviews,
                    ReviewsCount = totalReviewsCount,
                    PagesCount = (int)Math.Ceiling((double)totalReviewsCount / model.RecordsPerPage),
                };
                
                return Ok(reviewsInfoModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(All))]
        public async Task<ActionResult<ReviewsAndStatusesResponseModel>> All([FromBody] PaginatedAdminReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var responseModel = await this.reviewsService.GetReviewsWithReviewStatusesAsync(model);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(ChangeStatus))]
        public async Task<ActionResult<ChangeReviewStatusResponseModel>> ChangeStatus(ChangeReviewStatusRequestModel model)
        {
            try
            {
                var updatedReview = await this.reviewsService.ChangeReviewStatusAsync(model);
                return Ok(updatedReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<ActionResult<AdminReviewResponseModel>> Edit([FromBody] EditReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            { 
                var editedReview = await this.reviewsService.EditReviewAsync(model);
                return Ok(editedReview);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles =GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<ActionResult<AdminReviewResponseModel>> Delete([FromBody] DeleteReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var responseModel = await this.reviewsService.DeleteReviewAsync(model);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Undelete))]
        public async Task<ActionResult<AdminReviewResponseModel>> Undelete([FromBody] UndeleteReviewRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                var responseModel = await this.reviewsService.UndeleteReviewAsync(model);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
