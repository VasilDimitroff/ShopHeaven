using ShopHeaven.Models.Responses.Payments;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IPaymentSessionsService
    {
        Task<PaymentSessionResponseModel> GetPaymentSessionAsync(string id);

        Task ChangePaymentSessionStatusAsync(string id, bool isSuccessfull);

        Task CreatePaymentSessionAsync(string id, string userId, bool isSuccessful);
    }
}
