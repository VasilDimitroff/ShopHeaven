namespace ShopHeaven.Models.Responses.Carts
{
    public class ChangeProductQuantityResponseModel
    {
        public CartSummaryResponseModel Summary { get; set; }

        public int ProductsInCartCount { get; set; }

        public int ProductQuantity { get; set; }
    }
}
