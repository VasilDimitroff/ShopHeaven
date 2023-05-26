using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class DeleteUserRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
