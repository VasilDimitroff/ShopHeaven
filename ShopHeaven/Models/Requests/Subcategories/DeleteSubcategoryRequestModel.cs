using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Subcategories
{
    public class DeleteSubcategoryRequestModel
    {
        [Required]
        public string SubcategoryId { get; set; }
    }
}
