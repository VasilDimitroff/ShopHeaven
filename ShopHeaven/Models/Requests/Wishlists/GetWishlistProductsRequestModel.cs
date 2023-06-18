using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Wishlists
{
    public class GetWishlistProductsRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string WishlistId { get; set; }
    }
}
