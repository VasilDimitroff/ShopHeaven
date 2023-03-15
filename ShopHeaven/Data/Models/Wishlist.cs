namespace ShopHeaven.Data.Models
{
    public class Wishlist : GuidModel
    {
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
