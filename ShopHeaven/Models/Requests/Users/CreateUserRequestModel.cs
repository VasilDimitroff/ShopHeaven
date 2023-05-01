using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class CreateUserRequestModel
    {
        [Required(ErrorMessage = "Email cannot be empty")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password cannot be empty")]
        public string ConfirmPassword { get; set; }
    }
}
