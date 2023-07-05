using ShopHeaven.Models.Requests.Newsletter;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface INewsletterService
    {
        Task SubscribeAsync(NewsletterSubscriptionRequestModel model);
    }
}
