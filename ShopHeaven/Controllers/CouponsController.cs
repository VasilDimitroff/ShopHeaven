using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Coupons;
using ShopHeaven.Models.Responses.Coupons;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly ICouponsService couponsService;

        public CouponsController(ICouponsService couponsService)
        {
            this.couponsService = couponsService;
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Create))]
        public async Task<ActionResult<CouponResponseModel>> Create([FromBody] CreateCouponRequestModel model)
        {
            try
            {
                var createdCoupon = await this.couponsService.CreateCouponAsync(model);
                return Ok(createdCoupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Edit))]
        public async Task<ActionResult<CouponResponseModel>> Edit([FromBody] EditCouponRequestModel model)
        {
            try
            {
                var editedCoupon = await this.couponsService.EditCouponAsync(model);
                return Ok(editedCoupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Delete))]
        public async Task<ActionResult<CouponResponseModel>> Delete([FromBody] DeleteCouponRequestModel model)
        {
            try
            {
                var deletedCoupon = await this.couponsService.DeleteCouponAsync(model);
                return Ok(deletedCoupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(Undelete))]
        public async Task<ActionResult<CouponResponseModel>> Undelete([FromBody] UndeleteCouponRequestModel model)
        {
            try
            {
                var undeletedCoupon = await this.couponsService.UndeleteCouponAsync(model);
                return Ok(undeletedCoupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(GetAll))]
        public async Task<ActionResult<ICollection<CouponResponseModel>>> GetAll()
        {
            try
            {
                var allCoupons = await this.couponsService.GetAllCouponsAsync();
                return Ok(allCoupons);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles = GlobalConstants.UserRoleName), Route(nameof(Verify))]
        public async Task<ActionResult<CouponResponseModel>> Verify(VerifyCouponRequestModel model)
        {
            try
            {
                var verifiedCoupon = await this.couponsService.VerifyCouponAsync(model.Code);
                return Ok(verifiedCoupon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
