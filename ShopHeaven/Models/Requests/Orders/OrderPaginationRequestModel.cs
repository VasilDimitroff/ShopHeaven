namespace ShopHeaven.Models.Requests.Orders
{
    public class OrderPaginationRequestModel : PaginationRequestModel
    {
        public string? Criteria { get; set; }

        public string? Status { get; set; }

        public string? UserId { get; set; }
    }
}
