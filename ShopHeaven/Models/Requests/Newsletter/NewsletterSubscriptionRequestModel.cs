using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Newsletter
{
    public class NewsletterSubscriptionRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        public string? UserId { get; set; }
    }
}
