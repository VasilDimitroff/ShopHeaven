using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class LoginUserRequestModel
    {
        [Required(ErrorMessage = "Email cannot be empty")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }
    }
}
