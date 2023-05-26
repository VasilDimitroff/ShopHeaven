using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class UndeleteUserRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
