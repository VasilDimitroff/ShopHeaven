

using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Orders
{
    public class ChangeOrderStatusRequestModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
