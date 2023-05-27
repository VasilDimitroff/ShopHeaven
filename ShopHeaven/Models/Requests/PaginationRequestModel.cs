namespace ShopHeaven.Models.Requests
{
    public class PaginationRequestModel
    {
        public int RecordsPerPage { get; set; }

        public int Page { get; set; } = 1;

        public string? SearchTerm { get; set; } = "";
    }
}
