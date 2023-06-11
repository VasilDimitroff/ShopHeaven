using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Responses.ShippingMethods;

namespace ShopHeaven.Data.Services
{
    public class ShippingService : IShippingService
    {
        private readonly ShopDbContext db;

        public ShippingService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task<ICollection<ShippingMethodResponseModel>> GetShippingMethodsAsync()
        {
            return await this.db.ShippingMethods
                .Where(x => x.IsDeleted != true)
                .Select(x => new ShippingMethodResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Amount = x.ShippingAmount
                })
                .ToListAsync();
        }

        public async Task<ShippingMethod> GetShippingMethodByNameAsync(string method)
        {
            var shippingMethod = await this.db.ShippingMethods.FirstOrDefaultAsync(x => x.Name == method.Trim() && x.IsDeleted != true);

            if(shippingMethod == null)
            {
                throw new ArgumentException(GlobalConstants.InvalidShippingMethod);
            }

            return shippingMethod;
        }
    }
}
