using ShopHeaven.Models.Responses.Currencies;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICurrencyService
    {
        Task<List<CurrencyResponseModel>> GetCurrenciesAsync();
    }
}
