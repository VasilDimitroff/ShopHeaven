using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Images;
using ShopHeaven.Models.Responses.Images;

namespace ShopHeaven.Data.Services
{
    public class ImagesService : IImagesService
    {
        private readonly ShopDbContext db;

        public ImagesService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task DeleteProductImageAsync(DeleteProductImageRequestModel model)
        {
            var product = await this.db.Products
                .Include(x => x.Images.Where(x => x.IsDeleted != true))
                .FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentNullException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            if (product.Images.Count < 2)
            {
                throw new ArgumentException(GlobalConstants.ProductMustContainAtLeast1Image);
            }

            ProductImage productImage = await this.db.ProductsImages
                .FirstOrDefaultAsync(x => x.ProductId == model.ProductId && x.Image.Url == model.ImageUrl && x.IsDeleted != true);

            if (productImage == null)
            {
                throw new ArgumentNullException(GlobalConstants.ImageIsNotAttachedToThisProduct);
            }

            if (productImage.IsThumbnail)
            {
                foreach (var image in product.Images)
                {
                    image.IsThumbnail = false;
                }

                product.Images
                    .OrderByDescending(x => x.CreatedOn)
                    .FirstOrDefault()
                    .IsThumbnail = true;
            }

            this.db.ProductsImages.Remove(productImage);

            await this.db.SaveChangesAsync();
        }

        public async Task SetImageAsProductThumbnailAsync(SetProductThumbnailRequestModel model)
        {
            var product = await this.db.Products
               .Include(x => x.Images.Where(x => x.IsDeleted != true))
               .ThenInclude(x => x.Image)
               .FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentNullException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            ProductImage productImage = await this.db.ProductsImages
                .FirstOrDefaultAsync(x => x.ProductId == model.ProductId && x.Image.Url == model.ImageUrl && x.IsDeleted != true);

            if (productImage == null)
            {
                throw new ArgumentNullException(GlobalConstants.ImageIsNotAttachedToThisProduct);
            }

            foreach (var image in product.Images)
            {
                image.IsThumbnail = false;
            }

            productImage.IsThumbnail = true;
            productImage.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
        }
    }
}
