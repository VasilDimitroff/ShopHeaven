using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Reviews;
using ShopHeaven.Models.Responses.Reviews;

namespace ShopHeaven.Data.Services
{
    public class ReviewsService : IReviewsService
    {
        private readonly ShopDbContext db;

        public ReviewsService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task<ReviewResponseModel> CreateReviewAsync(CreateReviewRequestModel model)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == model.UserId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserDoesNotExist);
            }

            var product = await this.db.Products.FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            if (model.RatingValue < 1 )
            {
                model.RatingValue = 1;
            }

            if (string.IsNullOrWhiteSpace(model.Content))
            {
                throw new ArgumentException(GlobalConstants.RatingContentCannotBeEmpty);
            }

            var newReview = new Review() {
                CreatedOn = DateTime.UtcNow,
                CreatedBy = user,
                Content = model.Content.Trim(),
                RatingValue = model.RatingValue,
                Product = product, 
            };

            await this.db.Reviews.AddAsync(newReview);
            await this.db.SaveChangesAsync();

            var responseModel = new ReviewResponseModel()
            {
                Id = newReview.Id,
                Content = newReview.Content,
                CreatedOn = newReview.CreatedOn.ToString(),
                Email = user.Email,
                RatingValue = newReview.RatingValue,
            };

            return responseModel;
        }

        public async Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(string productId, ReviewStatus status)
        {
            var reviews = await this.db.Reviews
            .Where(r => r.ProductId == productId && r.IsDeleted != true && r.Status == status)
            .Select(r => new ReviewResponseModel
            {
                Id = r.Id,
                Email = r.CreatedBy.Email,
                Content = r.Content,
                RatingValue = r.RatingValue,
                CreatedOn = r.CreatedOn.ToString()
            })
            .ToListAsync();

            return reviews;
        }
    }
}
