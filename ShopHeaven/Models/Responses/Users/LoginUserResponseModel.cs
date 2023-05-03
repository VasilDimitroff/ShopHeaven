namespace ShopHeaven.Models.Responses.Users
{
    public class LoginUserResponseModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string JwtToken { get; set; }

        public IList<string> Roles { get; set; }
    }
}
