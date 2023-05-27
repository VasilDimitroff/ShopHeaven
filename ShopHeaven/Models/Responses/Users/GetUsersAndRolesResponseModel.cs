using ShopHeaven.Models.Responses.Roles;

namespace ShopHeaven.Models.Responses.Users
{
    public class GetUsersAndRolesResponseModel
    {
        public ICollection<UserWithRolesResponseModel> Users { get; set; }

        public ICollection<UserRoleResponseModel> ApplicationRoles { get; set; }

        public int UsersCount { get; set; }

        public int RecordsPerPage { get; set; }

        public int PagesCount => (int)Math.Ceiling((double)this.UsersCount / this.RecordsPerPage);
    }
}
