namespace ShopHeaven.Models.Responses.Users
{
    public class UserRefreshTokenResponse
    {
        public string Id { get; set; }

        public string RefreshToken { get; set; }

        public DateTime TokenCreated { get; set; }

        public DateTime TokenExpires { get; set; }

        public string Email { get; set; }

        public string JwtToken { get; set; }

        public IList<string> Roles { get; set; }
    }
}
