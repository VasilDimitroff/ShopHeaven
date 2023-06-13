using ShopHeaven.Models.Responses.Payments;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IPaymentSessionsService
    {
        Task<PaymentSessionResponseModel> GetPaymentSessionAsync(string id);

        Task UpdatePaymentSessionAsync(string id, bool isSuccessfull, string paymentId);

        Task CreatePaymentSessionAsync(string id, string userId, bool isSuccessful);
    }
}
