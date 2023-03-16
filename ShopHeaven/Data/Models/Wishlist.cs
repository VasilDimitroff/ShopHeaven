using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class Wishlist : BaseModel
    {
        public Wishlist()
        {
            Products = new HashSet<ProductWishlist>();
        }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        public ICollection<ProductWishlist> Products { get; set; } // this wishlist contains these products
    }
}
