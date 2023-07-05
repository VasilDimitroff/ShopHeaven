using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Newsletter;

namespace ShopHeaven.Data.Services
{
    public class NewsletterService : INewsletterService
    {
        private readonly IUsersService usersService;
        private readonly ShopDbContext db;

        public NewsletterService(IUsersService usersService, ShopDbContext db)
        {
            this.usersService = usersService;
            this.db = db;
        }

        public async Task SubscribeAsync(NewsletterSubscriptionRequestModel model)
        {
            User user = null;

            if (model.UserId != null)
            {
                user = await this.usersService.GetUserAsync(model.UserId);
            }

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentException(GlobalConstants.NameCannotBeEmpty);
            }

            var newsletterSubscription = new NewsletterSubscription
            {
                Name = model.Name.Trim(),
                UserId = user != null ? user.Id : null,
                Email = model.Email.Trim(),
            };

            await this.db.NewsletterSubscriptions.AddAsync(newsletterSubscription);
            await this.db.SaveChangesAsync();
        }
    }
}
