namespace ShopHeaven.Models.Responses.Carts
{
    public class AddProductToCartResponseModel
    {
        public int ProductsInCartCount { get; set; }

        public int Quantity { get; set; } // current quantity of product in user cart
    }
}
