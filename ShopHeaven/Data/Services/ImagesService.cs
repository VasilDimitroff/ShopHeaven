using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Images;

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
            var productImages = await this.db.Products
                .Where(x => x.IsDeleted != true)
                .Include(x => x.Images.Where(x => x.IsDeleted != true))
                .ToListAsync();

            if (productImages.Count < 2)
            {
                throw new ArgumentException(GlobalConstants.ProductMustContainAtLeast1Image);
            }

            ProductImage productImage = await this.db.ProductsImages
                .FirstOrDefaultAsync(x => x.ProductId == model.ProductId && x.Image.Url == model.ImageUrl && x.IsDeleted != true);

            if (productImage == null)
            {
                throw new ArgumentNullException(GlobalConstants.ImageIsNotAttachedToThisProduct);
            }

            productImage.IsDeleted = true;
            productImage.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();
        }
    }
}
