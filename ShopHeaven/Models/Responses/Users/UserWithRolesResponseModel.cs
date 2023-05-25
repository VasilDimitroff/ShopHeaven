using ShopHeaven.Models.Responses.Roles;

namespace ShopHeaven.Models.Responses.Users
{
    public class UserWithRolesResponseModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string CreatedOn { get; set; }

        public ICollection<UserRoleResponseModel> Roles { get; set; }
    }
}
