using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Subcategories
{
    public class BasicSubcategoryRequestModel
    {
        [Required]
        public string Id { get; set; }
    }
}
