using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Newsletter;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterService newsletterService;

        public NewsletterController(INewsletterService newsletterService)
        {
            this.newsletterService = newsletterService;
        }

        [HttpPost, Route(nameof(Subscribe))]
        public async Task<ActionResult> Subscribe(NewsletterSubscriptionRequestModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                await this.newsletterService.SubscribeAsync(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
