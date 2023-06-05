using ShopHeaven.Models.Requests.Currencies;
using ShopHeaven.Models.Responses.Currencies;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICurrencyService
    {
        Task<List<CurrencyResponseModel>> GetCurrenciesAsync();

        Task<CurrencyResponseModel> GetAppCurrencyAsync();

        Task<CurrencyResponseModel> SetAppCurrencyAsync(SetApplicationCurrencyRequestModel model);
    }
}
