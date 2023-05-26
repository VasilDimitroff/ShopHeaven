using ShopHeaven.Models.Responses.Roles;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Users
{
    public class UserWithRolesResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string CreatedOn { get; set; }

        public bool IsDeleted { get; set; }

        public ICollection<UserRoleResponseModel> Roles { get; set; }
    }
}
