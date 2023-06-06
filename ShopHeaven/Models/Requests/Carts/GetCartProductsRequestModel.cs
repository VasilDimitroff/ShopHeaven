using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Carts
{
    public class GetCartProductsRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string CartId { get; set; }
    }
}
