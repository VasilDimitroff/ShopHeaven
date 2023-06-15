using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Enums;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Enumerations;
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
                CreatedOn = newReview.CreatedOn,
                Email = user.Email,
                RatingValue = newReview.RatingValue,
            };

            return responseModel;
        }

        public async Task<ICollection<ReviewResponseModel>> GetReviewsByProductIdAsync(PaginatedProductReviewRequestModel model)
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
                    CreatedOn = r.CreatedOn,
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

        public async Task<ReviewsAndStatusesResponseModel> GetReviewsWithReviewStatusesAsync(PaginatedAdminReviewRequestModel model)
        {
            var reviewStatuses = this.GetReviewStatuses();
            var reviews = await this.GetReviewsAsync(model);

            //get deleted orders too
            IQueryable<Review> allReviews = this.db.Reviews.Include(x => x.CreatedBy);
            allReviews = FilterByCriteria(allReviews, model.Criteria.Trim(), model.SearchTerm.Trim());
            var allFilteredReviewsCount = await FilterByReviewStatus(allReviews, model.Status.Trim()).CountAsync();

            var responseModel = new ReviewsAndStatusesResponseModel
            {
                Reviews = reviews,
                ReviewStatuses = reviewStatuses,
                ReviewsCount = allFilteredReviewsCount,
                PagesCount = (int)Math.Ceiling((double)allFilteredReviewsCount / model.RecordsPerPage),
            };

            return responseModel;
        }

        public async Task<AdminReviewResponseModel> DeleteReviewAsync(DeleteReviewRequestModel model)
        {
            var review = await GetReviewByIdAsync(model.Id);

            if (review.IsDeleted)
            {
                throw new ArgumentException(GlobalConstants.ReviewAlreadyDeleted);
            }

            review.IsDeleted = true;
            review.ModifiedOn = DateTime.UtcNow;
            review.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var responseModel = CreateReviewResponseModel(review);

            return responseModel;
        }

        public async Task<AdminReviewResponseModel> UndeleteReviewAsync(UndeleteReviewRequestModel model)
        {
            var review = await GetReviewByIdAsync(model.Id);

            if (!review.IsDeleted)
            {
                throw new ArgumentException(GlobalConstants.ReviewAlreadyUndeleted);
            }

            review.IsDeleted = false;
            review.ModifiedOn = DateTime.UtcNow;
            review.DeletedOn = null;

            await this.db.SaveChangesAsync();

            var responseModel = CreateReviewResponseModel(review);

            return responseModel;
        }

        public async Task<ChangeReviewStatusResponseModel> ChangeReviewStatusAsync(ChangeReviewStatusRequestModel model)
        {
            //including deleted
            var review = await this.db.Reviews.FirstOrDefaultAsync(x => x.Id == model.Id);

            if (review == null)
            {
                throw new ArgumentException(GlobalConstants.ReviewNotFound);
            }

            bool isOrderStatusParsed = Enum.TryParse<ReviewStatus>(model.Status.Trim(), out ReviewStatus status);

            if (isOrderStatusParsed)
            {
                review.Status = status;
                await this.db.SaveChangesAsync();
            }

            var responseModel = new ChangeReviewStatusResponseModel
            {
                Id = review.Id,
                Status = review.Status.ToString()
            };

            return responseModel;
        }

        public async Task<AdminReviewResponseModel> EditReviewAsync(EditReviewRequestModel model)
        {
            var review = await GetReviewByIdAsync(model.Id);
            review.Content = model.Content.Trim();

            await this.db.SaveChangesAsync();

            var responseModel = CreateReviewResponseModel(review);

            return responseModel;
        }

        private async Task<Review> GetReviewByIdAsync(string id)
        {
            var review = await this.db.Reviews
               .Include(x => x.CreatedBy)
               .Include(x => x.Product)
               .FirstOrDefaultAsync(x => x.Id == id);

            if (review == null)
            {
                throw new ArgumentException(GlobalConstants.ReviewNotFound);
            }

            return review;
        }

        private AdminReviewResponseModel CreateReviewResponseModel(Review review)
        {
            var responseModel = new AdminReviewResponseModel
            {
                Id = review.Id,
                Status = review.Status.ToString(),
                Content = review.Content,
                CreatedOn = review.CreatedOn,
                Email = review.CreatedBy.Email,
                IsDeleted = review.IsDeleted,
                Product = review.Product.Name,
                RatingValue = review.RatingValue
            };

            return responseModel;
        }

        private async Task<ICollection<AdminReviewResponseModel>> GetReviewsAsync(PaginatedAdminReviewRequestModel model)
        {
            //get deleted included
            IQueryable<Review> reviews = this.db.Reviews.Include(x => x.CreatedBy).Include(x => x.Product);

            reviews = FilterByCriteria(reviews, model.Criteria.Trim(), model.SearchTerm.Trim());
            reviews = FilterByReviewStatus(reviews, model.Status.Trim());

            var filteredReviews = await reviews.OrderByDescending(x => x.CreatedOn)
               .Skip((model.Page - 1) * model.RecordsPerPage)
               .Take(model.RecordsPerPage)
               .Select(review => new AdminReviewResponseModel
               {
                   Id = review.Id,
                   Content = review.Content,
                   Email = review.CreatedBy.Email,
                   CreatedOn = review.CreatedOn,
                   RatingValue = review.RatingValue,
                   IsDeleted = review.IsDeleted,
                   Product = review.Product.Name,
                   Status = review.Status.ToString(),
               })
               .ToListAsync();

            return filteredReviews;
        }

        private IQueryable<Review> FilterByCriteria(IQueryable<Review> reviews, string sortingCriteria, string searchTerm)
        {
            bool isSortCriteriaParsed = Enum.TryParse<ReviewSortingCriteria>(sortingCriteria, out ReviewSortingCriteria criteria);

            if (!isSortCriteriaParsed)
            {
                return reviews;
            }

            switch (criteria)
            {
                case ReviewSortingCriteria.Username:
                    return reviews.Where(e => e.CreatedBy.UserName.ToLower().Contains(searchTerm.ToLower()));
                case ReviewSortingCriteria.Email:
                    return reviews.Where(e => e.CreatedBy.Email.ToLower().Contains(searchTerm.ToLower()));
                case ReviewSortingCriteria.Content:
                    return reviews.Where(e => e.Content.ToLower().Contains(searchTerm.ToLower()));
                case ReviewSortingCriteria.ProductName:
                    return reviews.Where(e => e.Product.Name.ToLower().Contains(searchTerm.ToLower()));
                default:
                    return reviews;
            }
        }

        private IQueryable<Review> FilterByReviewStatus(IQueryable<Review> reviews, string orderStatus)
        {
            bool isReviewStatusParsed = Enum.TryParse<ReviewStatus>(orderStatus, out ReviewStatus status);

            if (!isReviewStatusParsed)
            {
                return reviews;
            }

            return reviews.Where(e => e.Status == status);
        }

        private ICollection<string> GetReviewStatuses()
        {
            var reviewStatuses = Enum.GetNames(typeof(ReviewStatus));
            return reviewStatuses;
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
