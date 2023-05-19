using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrenciesController : ControllerBase
    {
        private readonly ICurrencyService currencyService;

        public CurrenciesController(ICurrencyService currencyService)
        {
            this.currencyService = currencyService;
        }

        [HttpGet, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(GetAll))]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var currencies = await this.currencyService.GetCurrenciesAsync();
                return Ok(currencies);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
