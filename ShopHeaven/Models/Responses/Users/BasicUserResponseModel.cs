using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Users
{
    public class BasicUserResponseModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string CreatedOn { get; set; }

        public IList<string> Roles { get; set; }

    }
}
