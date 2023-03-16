using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class ProductWishlist : BaseModel
    {
        public int WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}