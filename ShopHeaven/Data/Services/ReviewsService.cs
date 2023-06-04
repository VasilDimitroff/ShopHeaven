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

            var product = await this.db.Products
                .Include(x => x.Reviews)
                .FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

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

            product.Reviews.Add(newReview);
            product.Rating = Math.Round(product.Reviews.Average(r => r.RatingValue), 2);

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

        public async Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(ProductPaginatedReviewRequestModel model)
        {
            var reviews = await this.db.Reviews
                .OrderByDescending(r => r.CreatedOn)
                .Where(r => r.ProductId == model.ProductId 
                    && r.IsDeleted != true
                    && r.Status == model.Status 
                    && r.Content.Contains(model.SearchTerm.Trim()))
                .Skip((model.Page - 1) * model.RecordsPerPage)
                .Take(model.RecordsPerPage)
                .Select(r => new ReviewResponseModel
                {
                    Id = r.Id,
                    Email = r.CreatedBy.Email,
                    Content = r.Content,
                    RatingValue = r.RatingValue,
                    CreatedOn = r.CreatedOn.ToString(),
                })
                .ToListAsync();

            return reviews;
        }
    }
}
