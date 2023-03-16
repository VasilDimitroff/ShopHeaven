using ShopHeaven.Data.Models.Common;

namespace ShopHeaven.Data.Models
{
    public class Wishlist : BaseModel
    {
        public Wishlist()
        {
            Products = new HashSet<ProductWishlist>();
        }

        public int UserId { get; set; }

        public User User { get; set; }

        public ICollection<ProductWishlist> Products { get; set; } // this wishlist contains these products
    }
}
