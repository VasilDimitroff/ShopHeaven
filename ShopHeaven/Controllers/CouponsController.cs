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
        public async Task<ActionResult<CouponResponseModel>> Create([FromBody] CouponRequestModel model)
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
    }
}
