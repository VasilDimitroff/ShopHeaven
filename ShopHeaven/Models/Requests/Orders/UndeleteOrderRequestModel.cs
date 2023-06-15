using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Orders
{
    public class UndeleteOrderRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
