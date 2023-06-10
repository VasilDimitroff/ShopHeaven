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
        private readonly IUsersService usersService;

        public ReviewsService(ShopDbContext db, IUsersService usersService)
        {
            this.db = db;
            this.usersService = usersService;
        }

        public async Task<ReviewResponseModel> CreateReviewAsync(CreateReviewRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            var product = await this.db.Products
                .Include(x => x.Reviews.Where(x => x.IsDeleted != true))
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
            product.Rating = Math.Round(product.Reviews
                    .Where(x => x.IsDeleted != true)
                    .Average(r => r.RatingValue), 2);

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

        public async Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(PaginatedReviewRequestModel model)
        {
            var status = ParseReviewStatus(model.Status);

            var reviews = await this.db.Reviews
                .OrderByDescending(r => r.CreatedOn)
                .Where(r => r.ProductId == model.ProductId 
                    && r.IsDeleted != true
                    && r.Status == status
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

        public async Task<int> GetReviewsCountByProductIdAsync(string productId)
        {
            var totalReviewsCount = await this.db.Reviews
                .Where(x => x.IsDeleted != true && x.ProductId == productId)
                .CountAsync();

            return totalReviewsCount;
        }

        private ReviewStatus ParseReviewStatus(string status)
        {
            bool isReviewStatusParsed = Enum.TryParse<ReviewStatus>(status, out ReviewStatus parsedStatus);

            if (!isReviewStatusParsed)
            {
                return ReviewStatus.Approved;
            }

            return parsedStatus;
        }
    }
}
