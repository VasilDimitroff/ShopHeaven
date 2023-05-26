using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Roles
{
    public class AddToRoleRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string RoleId { get; set; }
    }
}
