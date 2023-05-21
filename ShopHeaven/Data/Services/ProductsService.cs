﻿using Microsoft.EntityFrameworkCore;
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

            //get tags from database, or create it without saving DB
            var filteredTags = model.Tags.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var tags = await GetTagsAsync(filteredTags, user.Id);

            //create mapping objects for every tag
            await CreateProductTagsAsync(tags, newProduct.Id);

            // get labels from database, or create it without saving DB
            var filteredLabels = model.Labels.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            var labels = await GetLabelsAsync(model.Labels);

            //create mapping objects for every label
            await CreateProductLabelAsync(labels, newProduct.Id);

            //create new records for every image
            var images = await CreateImagesAsync(model.Images, user.Id);

            //create productImage record for every image
            await CreateProductImagesAsync(images, newProduct.Id);

            var specifications = model.Specifications.Select(x => new Specification
            {
                ProductId = newProduct.Id,
                Key = x.Key,
                Value = x.Value,
            })
                .ToList();

            newProduct.CreatedById = user.Id;
            newProduct.Name = model.Name;
            newProduct.Description = model.Description;
            newProduct.Brand = model.Brand.Trim();
            newProduct.Currency = currency;
            newProduct.SubCategoryId = subcategory.Id;
            newProduct.Discount = model.Discount;
            newProduct.Price = model.Price;
            newProduct.HasGuarantee = model.HasGuarantee;
            newProduct.Quantity = model.Quantity;
            newProduct.Specifications = specifications;

            await this.db.Products.AddAsync(newProduct);
            await this.db.SaveChangesAsync();

            return null;
        }

        private async Task<IEnumerable<Image>> CreateImagesAsync(IEnumerable<IFormFile> images, string userId)
        {
            var productImagesUrls = await this.storageService.UploadImageAsync(images, userId);

            var newImages = new List<Image>();

            foreach (var imageUrl in productImagesUrls)
            {
                Image productImage = new Image()
                {
                    CreatedById = userId,
                    Url = imageUrl,
                };

                newImages.Add(productImage);
            }

            await this.db.Images.AddRangeAsync(newImages);

            return newImages;
        }

        private async Task CreateProductImagesAsync(IEnumerable<Image> images, string productId)
        {
            var productImages = new List<ProductImage>();

            foreach (var image in images)
            {
                var productImage = new ProductImage()
                {
                    ProductId = productId,
                    ImageId = image.Id
                };

                productImages.Add(productImage);
            }

            await this.db.ProductsImages.AddRangeAsync(productImages);
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