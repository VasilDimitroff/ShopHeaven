namespace ShopHeaven.Models.Responses.Carts
{
    public class GetCartProductsResponseModel
    {
        public ICollection<CartProductResponseModel> Products { get; set; }

        public CartSummaryResponseModel Summary { get; set; }
    }
}
