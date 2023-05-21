using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Products;

namespace ShopHeaven.Data.Services
{
    public class ProductsService : IProductsService
    {
        private readonly ShopDbContext db;
        private readonly IStorageService storageService;

        public ProductsService(ShopDbContext db, IStorageService storageService)
        {
            this.db = db;
            this.storageService = storageService;
        }
        public async Task<CreateProductResponseModel> CreateProductAsync(CreateProductRequestModel model)
        {
            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == model.CreatedBy && x.IsDeleted != true);

            if (user == null)
            {
                throw new NullReferenceException(GlobalConstants.UserDoesNotExist);
            }

            var subcategory = await this.db.SubCategories
                .FirstOrDefaultAsync(x => x.Id == model.SubcategoryId && x.IsDeleted != true);

            if (subcategory == null)
            {
                throw new NullReferenceException(GlobalConstants.SubcategoryWithThisIdDoesntExist);
            }

            var currency = await this.db.Currencies.
                FirstOrDefaultAsync(x => x.Id == model.CurrencyId && x.IsDeleted != true);

            if (currency == null)
            {
                throw new NullReferenceException(GlobalConstants.CurrencyWithThisIdDoesntExist);
            }

            if (model.Name.Trim().Length < 2)
            {
                throw new ArgumentException(GlobalConstants.ProductNameNotEnoughLength);
            }

            if (model.Description.Trim().Length < 5)
            {
                throw new ArgumentException(GlobalConstants.ProductDescriptionNotEnoughLength);
            }

            if (model.Price < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductPriceCannotBeNegativeNumber);
            }

            if (model.Discount < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductDiscountCannotBeNegativeNumber);
            }

            if (model.Quantity < 0)
            {
                throw new ArgumentException(GlobalConstants.ProductQuantityCannotBeNegativeNumber);
            }
            
            if (model.Tags.Count < 1)
            {
                throw new ArgumentException(GlobalConstants.ProductMustContainAtLeast1Tag);
            }

            var newProduct = new Product();


            //get tags from database, if there is not some tag, create it
            var tags = await GetTagsAsync(model.Tags, user.Id);

            //create mapping objects for every tag
            await CreateProductTagsAsync(tags, newProduct.Id);

            // get labels from database, if there is not some label, create it
            var labels = await GetLabelsAsync(model.Labels);

            //create mapping objects for every label
            await CreateProductLabelAsync(labels, newProduct.Id);

            var productImagesUrls = await this.storageService.UploadImageAsync(model.Images, model.CreatedBy);

            var images = new List<Image>();
            foreach (var imageUrl in productImagesUrls)
            {
                Image productImage = new Image()
                {
                    CreatedById = user.Id,
                    Url = imageUrl,
                };

                images.Add(productImage);
            }

            await this.db.Images.AddRangeAsync(images);

            return null;
        }

        private async Task<ICollection<Tag>>GetTagsAsync(IEnumerable<string> tags, string userId)
        {
            var allTags = new List<Tag>();

            foreach (var tag in tags)
            {
                Tag searchedTag = await this.db.Tags
                    .FirstOrDefaultAsync(x => x.Name == tag.Trim().ToUpper() && x.IsDeleted != true);

                if (searchedTag == null)
                {
                    searchedTag = new Tag()
                    {
                        Name = tag.Trim().ToUpper(),
                        CreatedById = userId
                    };

                    await this.db.Tags.AddAsync(searchedTag);
                    await this.db.SaveChangesAsync();
                }

                allTags.Add(searchedTag);
            }


            return allTags;
        }

        private async Task CreateProductTagsAsync(IEnumerable<Tag> tags, string productId)
        {
            var productTags = new List<ProductTag>();

            foreach (var tag in tags)
            {
                var productTag = new ProductTag()
                {
                    ProductId = productId,
                    TagId = tag.Id
                };

                productTags.Add(productTag);
            }

            await this.db.ProductsTags.AddRangeAsync(productTags);
        }

        private async Task<ICollection<Label>> GetLabelsAsync(IEnumerable<string> labels)
        {
            var allLabels = new List<Label>();

            foreach (var label in labels)
            {
                Label searchedLabel = await this.db.Labels
                    .FirstOrDefaultAsync(x => x.Content == label.Trim().ToUpper() && x.IsDeleted != true);

                if (searchedLabel == null)
                {
                    searchedLabel = new Label()
                    {
                        Content = label.Trim().ToUpper()
                    };

                    await this.db.Labels.AddAsync(searchedLabel);
                    await this.db.SaveChangesAsync();
                }

                allLabels.Add(searchedLabel);
            }


            return allLabels;
        }

        private async Task CreateProductLabelAsync(ICollection<Label> labels, string productId)
        {
            var productLabels = new List<ProductLabel>();

            foreach (var label in labels)
            {
                var productLabel = new ProductLabel()
                {
                    ProductId = productId,
                    LabelId = label.Id
                };

                productLabels.Add(productLabel);
            }

            await this.db.ProductsLabels.AddRangeAsync(productLabels);
        }
    }
}
