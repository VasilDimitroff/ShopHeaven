namespace ShopHeaven.Models.Requests.Products
{
    public class AdminProductPaginationRequestModel : PaginationRequestModel
    {
        public string? CategoryId { get; set; } = "";
    }
}
