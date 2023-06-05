using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Currencies;
using ShopHeaven.Models.Responses.Currencies;

namespace ShopHeaven.Data.Services
{
    public class CurrencyService : ICurrencyService
    {
        private readonly ShopDbContext db;

        public CurrencyService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task<CurrencyResponseModel> GetAppCurrencyAsync()
        {
            var appCurrency = await this.db.Currencies
                .Where(x => x.IsCurrentForApplication && x.IsDeleted != true)
                .Select(x => new CurrencyResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    IsCurrentForApplication = x.IsCurrentForApplication
                })
                .FirstOrDefaultAsync();

            return appCurrency;
        }

        public async Task<List<CurrencyResponseModel>> GetCurrenciesAsync()
        {
            var currencies = await this.db.Currencies
                .Where(x => x.IsDeleted != true)
                .Select(x => new CurrencyResponseModel
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    IsCurrentForApplication = x.IsCurrentForApplication
                })
                .OrderBy(x => x.Code)
                .ToListAsync();

            return currencies;
        }

        public async Task<CurrencyResponseModel> SetAppCurrencyAsync(SetApplicationCurrencyRequestModel model)
        {
            var currencies = await this.db.Currencies
                  .Where(x => x.IsDeleted != true)
                  .ToListAsync();

            var targetCurrency = currencies.FirstOrDefault(x => x.Id == model.Id);

            if (targetCurrency == null)
            {
                throw new ArgumentException(GlobalConstants.CurrencyWithThisIdDoesntExist);
            }

            foreach(var currency in currencies)
            {
                if (currency.Id == targetCurrency.Id)
                {
                    currency.IsCurrentForApplication = true;
                    targetCurrency = currency;
                }
                else
                {
                    currency.IsCurrentForApplication = false;
                }
            }

            await this.db.SaveChangesAsync();

            var responseModel = new CurrencyResponseModel
            {
                Id = targetCurrency.Id,
                Code = targetCurrency.Code,
                Name = targetCurrency.Name,
                IsCurrentForApplication = targetCurrency.IsCurrentForApplication
            };

            return responseModel;
        }
    }
}
