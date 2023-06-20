using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class UserBaseRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
