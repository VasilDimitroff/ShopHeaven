using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Services.Contracts;
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

        public async Task<List<CurrencyResponseModel>> GetCurrenciesAsync()
        {
            var currencies = await this.db.Currencies
                .Select(x => new CurrencyResponseModel
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name
                })
                .OrderBy(x => x.Code)
                .ToListAsync();

            return currencies;
        }
    }
}
