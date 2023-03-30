using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests
{
    public class CreateUserRequestModel
    {
        [Required(ErrorMessage = "Username cannot be empty")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password cannot be empty")]
        public string ConfirmPassword { get; set; }
    }
}
