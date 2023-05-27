using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Products
{
    public class ProductPaginationRequestModel : PaginationRequestModel
    {
        public string? CategoryId { get; set; }
    }
}
