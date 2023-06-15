using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Orders
{
    public class DeleteOrderRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
