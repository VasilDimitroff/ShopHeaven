using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Subcategories
{
    public class SubcategorySummaryRequestModel
    {
        [Required]
        public string CategoryId { get; set; }
    }
}
