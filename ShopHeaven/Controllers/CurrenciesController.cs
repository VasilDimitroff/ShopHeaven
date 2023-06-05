using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Currencies;
using ShopHeaven.Models.Responses.Currencies;

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

        [HttpPost, Authorize(Roles = GlobalConstants.AdministratorRoleName), Route(nameof(SetAppCurrency))]
        public async Task<ActionResult<CurrencyResponseModel>> SetAppCurrency([FromBody]SetApplicationCurrencyRequestModel model)
        {
            try
            {
                var currency = await this.currencyService.SetAppCurrencyAsync(model);
                return Ok(currency);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
