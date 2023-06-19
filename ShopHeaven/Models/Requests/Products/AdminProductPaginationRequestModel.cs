namespace ShopHeaven.Models.Requests.Products
{
    public class AdminProductPaginationRequestModel : PaginationRequestModel
    {
        public string? CategoryId { get; set; } = "";

        public string? SortingCriteria { get; set; } = "";

        public string? UserId { get; set; } = "";
    }
}
