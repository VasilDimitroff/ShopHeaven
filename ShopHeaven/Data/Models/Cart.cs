namespace ShopHeaven.Data.Models
{
    public class Cart : GuidModel
    {
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
