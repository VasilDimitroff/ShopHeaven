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
        private readonly IUsersService usersService;
        private readonly IProductsService productsService;

        public CartsService(ShopDbContext db, IUsersService usersService, IProductsService productsService)
        {
            this.db = db;
            this.usersService = usersService;
            this.productsService = productsService;
        }

        public async Task<AddProductToCartResponseModel> AddProductToCartAsync(AddProductToCartRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId)
            {
                throw new ArgumentException(GlobalConstants.CannotAddProductToOtherCarts);
            }

            var cart = await GetCartAsync(model.CartId);

            var product = await this.productsService.GetProductAsync(model.ProductId);

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
            Cart userCart = await UpdateCartAmountAsync(user);

            var productsInUserCart = userCart.Products
                .Where(x => x.IsDeleted != true)
                .Sum(pc => pc.Quantity);

            var responseModel = new AddProductToCartResponseModel
            {
                ProductsInCartCount = productsInUserCart,
                Quantity = model.Quantity,
            };

            return responseModel;
        }

        public async Task<ChangeProductQuantityResponseModel> ChangeProductQuantityAsync(ChangeProductQuantityRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId) throw new ArgumentException(GlobalConstants.CannotAddProductToOtherCarts);

            var cart = await GetCartAsync(model.CartId);

            var product = await this.productsService.GetProductAsync(model.ProductId);

            if (model.NewQuantity < 1) throw new ArgumentException(GlobalConstants.MinimumQuantityToAddProductInCart);

            if (model.NewQuantity > product.Quantity) throw new Exception(GlobalConstants.NotEnoughProductQuantity);

            var productCart = await this.db.ProductsCarts
                .FirstOrDefaultAsync(x => x.CartId == model.CartId && x.ProductId == model.ProductId && x.IsDeleted != true);

            if (productCart == null) throw new ArgumentException(GlobalConstants.ProductInCartNotFound);

            productCart.Quantity = model.NewQuantity;

            await this.db.SaveChangesAsync();

            Cart userCart = await UpdateCartAmountAsync(user);

            var productsInUserCart = userCart.Products
                .Where(x => x.IsDeleted != true)
                .Sum(pc => pc.Quantity);

            var cartSummary = await GetCartTotalPriceAsync(cart.Id);

            return new ChangeProductQuantityResponseModel
            {
                ProductsInCartCount = productsInUserCart,
                ProductQuantity = model.NewQuantity,
                Summary = cartSummary
            };
        }

        public async Task DeleteProductFromCartAsync(DeleteProductFromCartRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId) throw new ArgumentException(GlobalConstants.YouCanDeleteProductsFromYourCartsOnly);

            await GetCartAsync(model.CartId);

            await this.productsService.GetProductAsync(model.ProductId);

            var productCart = await this.db.ProductsCarts
               .FirstOrDefaultAsync(x => x.CartId == model.CartId && x.ProductId == model.ProductId && x.IsDeleted != true);

            if (productCart == null)
            {
                throw new ArgumentException(GlobalConstants.ProductIsNotInTheCart);
            }

            this.db.ProductsCarts.Remove(productCart);
            await this.db.SaveChangesAsync();

            var updatedCart = await UpdateCartAmountAsync(user);
        }

        public async Task<ICollection<ProductCart>> GetCartProductsAsync(string cartId){
            var productCarts = await this.db.ProductsCarts
                .Include(x => x.Product)
                .Where(x => x.CartId == cartId && x.IsDeleted != true)
                .ToListAsync();

            return productCarts;
        }

        public async Task<ICollection<CartProductResponseModel>> GetCartProductsFullInfoAsync(GetCartProductsRequestModel model)
        {
            var user = await this.usersService.GetUserAsync(model.UserId);

            if (user.CartId != model.CartId) throw new ArgumentException(GlobalConstants.YouCanSeeOnlyYourCartProducts);

            await GetCartAsync(model.CartId);

            var products = await this.db.ProductsCarts
                .Where(pc => pc.CartId == model.CartId && pc.IsDeleted != true)
                .OrderByDescending(x => x.CreatedOn)
                .Select(pc => new CartProductResponseModel
                {
                    Id = pc.ProductId,
                    Name = pc.Product.Name,
                    Description = pc.Product.Description,
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
                TotalPriceWithNoDiscount = cart.TotalPriceWithNoDiscount,
                TotalDiscount = cart.TotalPriceWithNoDiscount - cart.TotalPriceWithDiscount
            };

            return responseModel;
        }

        public int GetProductsCountInCartAsync(string cartId)
        {
            var productsCount = this.db.ProductsCarts
                .Where(x => x.CartId == cartId && x.IsDeleted != true)
                .Sum(x => x.Quantity);

            return productsCount;
        }

        public async Task<Cart> GetCartAsync(string cartId)
        {
            var cart = await this.db.Carts
                            .FirstOrDefaultAsync(x => x.Id == cartId && x.IsDeleted != true);

            if (cart == null)
            {
                throw new ArgumentException(GlobalConstants.CartDoesNotExist);
            }

            return cart;
        }

        public async Task EmptyCartAsync(string cartId)
        {
            var productCartsToRemove = this.db.ProductsCarts.Where(pc => pc.CartId == cartId && pc.IsDeleted != true);
            this.db.ProductsCarts.RemoveRange(productCartsToRemove);
            await this.db.SaveChangesAsync();
        }

        private async Task<Cart> UpdateCartAmountAsync(User user)
        {
            var userCart = await this.db.Carts
                                    .Include(c => c.Products.Where(x => x.IsDeleted != true))
                                    .ThenInclude(cp => cp.Product)
                                    .FirstOrDefaultAsync(c => c.UserId == user.Id && c.IsDeleted != true);

            //update total price of the cart
            var totalPriceWithNoDiscount = userCart.Products
                .Where(x => x.IsDeleted != true)
                .Sum(pc => pc.Product.Price * pc.Quantity);

            userCart.TotalPriceWithNoDiscount = totalPriceWithNoDiscount;

            var totalPriceWithDiscount = totalPriceWithNoDiscount - userCart.Products
                    .Where(x => x.IsDeleted != true)
                    .Sum(pc => pc.Product.Price * pc.Quantity * (pc.Product.Discount / 100));

            userCart.TotalPriceWithDiscount = totalPriceWithDiscount;

            await this.db.SaveChangesAsync();

            return userCart;
        }
    }
}