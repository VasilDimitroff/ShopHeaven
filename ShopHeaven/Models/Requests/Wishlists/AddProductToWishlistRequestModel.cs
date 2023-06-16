using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Wishlists
{
    public class AddProductToWishlistRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string WishlistId { get; set; }

        [Required]
        public string ProductId { get; set; }

    }
}
