using System.Drawing;

namespace ShopHeaven.Models.Token
{
    public class RefreshToken
    {
        public string JwtToken { get; set; } = string.Empty;

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public DateTime Expires { get; set; }
    }
}
