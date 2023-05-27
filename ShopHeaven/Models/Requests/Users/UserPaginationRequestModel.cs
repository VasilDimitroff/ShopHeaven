namespace ShopHeaven.Models.Requests.Users
{
    public class UserPaginationRequestModel : PaginationRequestModel
    {
        public string? Criteria { get; set; }
    }
}
