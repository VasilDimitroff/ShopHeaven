namespace ShopHeaven.Models.Responses.Carts
{
    public class DeleteProductFromCartResponseModel
    {
        public string ProductCartId { get; set; } //deleted ProdcutCart object

        public CartSummaryResponseModel Summary { get; set; } //updated cart summary
    }
}
