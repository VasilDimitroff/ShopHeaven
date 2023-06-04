using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Carts;

namespace ShopHeaven.Data.Services
{
    public class CartsService : ICartsService
    {
        private readonly ShopDbContext db;

        public CartsService(ShopDbContext db)
        {
            this.db = db;
        }

        public async Task<AddProductToCartResponseModel> AddProductToCartAsync(AddProductToCartRequestModel model)
        {
            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == model.UserId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            if (user.CartId != model.CartId)
            {
                throw new ArgumentException(GlobalConstants.CannotAddProductToOtherCarts);
            }

            var cart = await this.db.Carts
                .FirstOrDefaultAsync(x => x.Id == model.CartId && x.IsDeleted != true);

            if (cart == null)
            {
                throw new ArgumentException(GlobalConstants.CartDoesNotExist);
            }

            var product = await this.db.Products.
                FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            if (model.Quantity > product.Quantity)
            {
                throw new Exception(GlobalConstants.NotEnoughProductQuantity);
            }

            var productCart = await this.db.ProductsCarts
                .FirstOrDefaultAsync(x => x.CartId == model.CartId && x.ProductId == model.ProductId && x.IsDeleted != true);

            //check if current quantity + wanted to add quantity is more than in stock quantity of product
            if (productCart != null)
            {
                var futureQuantity = productCart.Quantity + model.Quantity; //current quantity + wanted to add quantity

                if (futureQuantity > product.Quantity)
                {
                    throw new Exception(GlobalConstants.CurrentQuantityPlusWantedQuantityIsMoreThanQuantityInStock);
                }

                else
                {
                    productCart.Quantity += model.Quantity;
                }
            }

            else
            {
                productCart = new ProductCart(){
                    ProductId = model.ProductId,
                    CartId = model.CartId,
                    Quantity = model.Quantity,
                };

                await this.db.ProductsCarts.AddAsync(productCart);
            }
         
            await this.db.SaveChangesAsync();

            var userCart = await this.db.Carts
                        .Include(c => c.Products)
                        .FirstOrDefaultAsync(c => c.UserId == user.Id && c.IsDeleted != true);

            var productsInUserCart = userCart.Products.Count();

            var responseModel = new AddProductToCartResponseModel
            {
                ProductsInCartCount = productsInUserCart,
                Quantity = model.Quantity,
            };

            return responseModel;
        }
    }
}
