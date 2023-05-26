using ShopHeaven.Models.Responses.Roles;

namespace ShopHeaven.Models.Responses.Users
{
    public class GetUsersAndRolesResponseModel
    {
        public ICollection<UserWithRolesResponseModel> Users { get; set; }

        public ICollection<UserRoleResponseModel> ApplicationRoles { get; set; }
    }
}
