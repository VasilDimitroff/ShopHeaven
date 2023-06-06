using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Carts;
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
            var user = await GetUserAsync(model.UserId);

            if (user.CartId != model.CartId)
            {
                throw new ArgumentException(GlobalConstants.CannotAddProductToOtherCarts);
            }

            var cart = await GetCartAsync(model.CartId);

            var product = await GetProductAsync(model);

            if (model.Quantity < 1) throw new ArgumentException(GlobalConstants.MinimumQuantityToAddProductInCart);

            if (model.Quantity > product.Quantity) throw new Exception(GlobalConstants.NotEnoughProductQuantity);

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
                productCart = new ProductCart()
                {
                    ProductId = model.ProductId,
                    CartId = model.CartId,
                    Quantity = model.Quantity,
                };

                await this.db.ProductsCarts.AddAsync(productCart);
            }

            await this.db.SaveChangesAsync();

            var userCart = await this.db.Carts
                        .Include(c => c.Products)
                        .ThenInclude(cp => cp.Product)
                        .FirstOrDefaultAsync(c => c.UserId == user.Id && c.IsDeleted != true);

            //update total price of the cart
            var totalPriceWithNoDiscount = userCart.Products.Sum(pc => pc.Product.Price * pc.Quantity);
            userCart.TotalPriceWithNoDiscount = totalPriceWithNoDiscount;

            var totalPriceWithDiscount = totalPriceWithNoDiscount - userCart.Products.Sum(pc => pc.Product.Price * pc.Quantity * (pc.Product.Discount / 100));
            userCart.TotalPriceWithDiscount = totalPriceWithDiscount;

            await this.db.SaveChangesAsync();

            var productsInUserCart = userCart.Products.Count();

            var responseModel = new AddProductToCartResponseModel
            {
                ProductsInCartCount = productsInUserCart,
                Quantity = model.Quantity,
            };

            return responseModel;
        }

        public async Task<ICollection<CartProductResponseModel>> GetCartProductsAsync(GetCartProductsRequestModel model)
        {
            var user = await GetUserAsync(model.UserId);

            if (user.CartId != model.CartId) throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts);

            await GetCartAsync(model.CartId);

            var products = await this.db.ProductsCarts
                .Where(pc => pc.CartId == model.CartId && pc.IsDeleted != true)
                .OrderByDescending(x => x.CreatedOn)
                .Select(pc => new CartProductResponseModel
                {
                    Id = pc.ProductId,
                    Name = pc.Product.Name,
                    Description = pc.Product.Description.Substring(0, Math.Min(200, pc.Product.Description.Length)) + "...",
                    Image = pc.Product.Images.FirstOrDefault(pi => pi.IsThumbnail == true && pi.IsDeleted != true).Image.Url ?? "",
                    Discount = pc.Product.Discount,
                    Price = pc.Product.Price,
                    HasGuarantee = pc.Product.HasGuarantee,
                    PurchasedQuantity = pc.Quantity,
                    IsAvailable = pc.Product.IsAvailable,
                    InStockQuantity = pc.Product.Quantity
                })
                .ToListAsync();


            return products;
        }

        public async Task<CartSummaryResponseModel> GetCartTotalPriceAsync(string cartId)
        {
            var cart = await GetCartAsync(cartId);

            var responseModel = new CartSummaryResponseModel
            {
                TotalPriceWithDiscount = cart.TotalPriceWithDiscount,
                TotalPriceWithNoDiscount = cart.TotalPriceWithNoDiscount
            };

            return responseModel;
        }

        private async Task<User> GetUserAsync(string userId)
        {
            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            return user;
        }

        private async Task<Cart> GetCartAsync(string cartId)
        {
            var cart = await this.db.Carts
                            .FirstOrDefaultAsync(x => x.Id == cartId && x.IsDeleted != true);

            if (cart == null)
            {
                throw new ArgumentException(GlobalConstants.CartDoesNotExist);
            }

            return cart;
        }

        private async Task<Product> GetProductAsync(AddProductToCartRequestModel model)
        {
            var product = await this.db.Products.
                            FirstOrDefaultAsync(x => x.Id == model.ProductId && x.IsDeleted != true);

            if (product == null)
            {
                throw new ArgumentException(GlobalConstants.ProductWithThisIdDoesNotExist);
            }

            return product;
        }
    }
}
