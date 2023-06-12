namespace ShopHeaven.Models.Requests.Orders
{
    public class OrderPaginationRequestModel : PaginationRequestModel
    {
        public string? Criteria { get; set; }
    }
}
