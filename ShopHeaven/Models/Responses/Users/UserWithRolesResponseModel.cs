using ShopHeaven.Models.Responses.Roles;

namespace ShopHeaven.Models.Responses.Users
{
    public class UserWithRolesResponseModel
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool IsDeleted { get; set; }

        public ICollection<UserRoleResponseModel> Roles { get; set; }
    }
}
