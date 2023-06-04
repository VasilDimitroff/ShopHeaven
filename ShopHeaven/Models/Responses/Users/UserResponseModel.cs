namespace ShopHeaven.Models.Responses.Users
{
    public class UserResponseModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string CreatedOn { get; set; }

        public string CartId { get; set; }

        public string WishlistId { get; set; }

        public IList<string> Roles { get; set; }

    }
}
