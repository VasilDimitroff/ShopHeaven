﻿using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Wishlists;
using ShopHeaven.Models.Responses.Wishlists;

namespace ShopHeaven.Data.Services
{
    public class WishlistsService : IWishlistsService
    {
        private readonly ShopDbContext db;
        private readonly IProductsService productsService;
        private readonly IUsersService usersService;

        public WishlistsService(ShopDbContext db, IProductsService productsService, IUsersService usersService)
        {
            this.db = db;
            this.productsService = productsService;
            this.usersService = usersService;
        }
        public async Task<AddProductToWishlistResponseModel> AddProductToWishlistAsync(AddProductToWishlistRequestModel model)
        {
            var product = await this.productsService.GetProductAsync(model.ProductId);
            var user = await this.usersService.GetUserAsync(model.UserId);
            var wishlist = await this.GetWishlistAsync(model.WishlistId);

            if (user.WishlistId != model.WishlistId) { throw new ArgumentException(GlobalConstants.CannotAddProductsInOthersWishlists);  }

            var productInWishlist = wishlist.Products
                .FirstOrDefault(x => x.WishlistId == wishlist.Id && x.ProductId == product.Id && x.IsDeleted != true);

            if (productInWishlist != null)
            {
                throw new ArgumentException(GlobalConstants.ProductAlreadyExistsInWishlist);
            }

            var wishlistProduct = new ProductWishlist
            {
                ProductId = product.Id,
                WishlistId = wishlist.Id,
            };

            await this.db.ProductsWishlists.AddAsync(wishlistProduct);
            await this.db.SaveChangesAsync();

            var productsInWishlistCount = await GetProductsInWishlistCount(wishlist.Id);

            var addProductToWishlistResponseModel = new AddProductToWishlistResponseModel
            {
                ProductsInWishlistCount = productsInWishlistCount,
                IsProductInTheWishlist = true,
            };

            return addProductToWishlistResponseModel;
        }

        public async Task<DeleteProductFromWishlistResponseModel> DeleteProductFromWishlistAsync(DeleteProductFromWishlistRequestModel model)
        {
            var product = await this.productsService.GetProductAsync(model.ProductId);
            var user = await this.usersService.GetUserAsync(model.UserId);
            var wishlist = await this.GetWishlistAsync(model.WishlistId);

            if (user.WishlistId != model.WishlistId) { throw new ArgumentException(GlobalConstants.CannotAddProductsInOthersWishlists); }

            var productInWishlist = wishlist.Products
                .FirstOrDefault(x => x.WishlistId == wishlist.Id && x.ProductId == product.Id && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductIsNotInWishlist);
            }

            this.db.ProductsWishlists.Remove(productInWishlist);
            await this.db.SaveChangesAsync();

            var productsInWishlistCount = await GetProductsInWishlistCount(wishlist.Id);

            var deleteProductFromWishlist = new DeleteProductFromWishlistResponseModel
            {
                WishlistProductsCount = productsInWishlistCount,
                IsProductInTheWishlist = false,
            };

            return deleteProductFromWishlist;
        }

        private async Task<int> GetProductsInWishlistCount(string wishlistId)
        {
            var productsCount = await this.db.ProductsWishlists
                .Where(x => x.WishlistId == wishlistId && x.IsDeleted != true)
                .CountAsync();

            return productsCount;
        }

        private async Task<Wishlist> GetWishlistAsync(string id)
        {
            var wishlist = await this.db.Wishlists
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (wishlist == null)
            {
                throw new ArgumentException(GlobalConstants.WishlistNotFound);
            }

            return wishlist;
        }
    }
}
