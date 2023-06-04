namespace ShopHeaven.Models.Requests.Products
{
    public class ProductRequestModel : PaginationRequestModel
    {
        public string Id { get; set; }

        public string? UserId { get; set; }

        public int SimilarProductsCount { get; set; }
    }
}
