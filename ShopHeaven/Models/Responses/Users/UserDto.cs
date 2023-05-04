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

        [Required]
        public DateTime CreatedOn { get; set; }
    }
}
