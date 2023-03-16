using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductWishlist : BaseModel
    {
        public string WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }

        public string ProductId { get; set; }

        public Product Product { get; set; }
    }
}