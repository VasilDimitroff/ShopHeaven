using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Responses.Payments;

namespace ShopHeaven.Data.Services
{
    public class PaymentSessionsService : IPaymentSessionsService
    {
        private readonly ShopDbContext db;

        public PaymentSessionsService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task CreatePaymentSessionAsync(string id, string userId, bool isSuccessful)
        {
            var newPaymentSession = new PaymentSession
            {
                Id = id,
                CreatedById = userId,
                IsSuccessful = isSuccessful,
            };

            await this.db.PaymentSessions.AddAsync(newPaymentSession);

            await this.db.SaveChangesAsync();
        }

        public async Task UpdatePaymentSessionAsync(string id, bool isSuccessfull, string paymentId)
        {
            var paymentSession = await this.db.PaymentSessions
                .Include(x => x.Payment)
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (paymentSession == null)
            {
                throw new ArgumentException(GlobalConstants.PaymentSessionNotFound);
            }

            paymentSession.IsSuccessful = isSuccessfull;
            paymentSession.PaymentId = paymentId;

            await this.db.SaveChangesAsync();
        }

        public async Task<PaymentSessionResponseModel> GetPaymentSessionAsync(string id)
        {
            var paymentSession = await this.db.PaymentSessions.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (paymentSession == null)
            {
                throw new ArgumentException(GlobalConstants.PaymentSessionNotFound);
            }

            var paymentSessionResponseModel = new PaymentSessionResponseModel
            {
                Id = paymentSession.Id,
                CreatedOn = paymentSession.CreatedOn.ToString(),
                IsSuccessful = paymentSession.IsSuccessful,
            };

            return paymentSessionResponseModel;
        }
    }
}
