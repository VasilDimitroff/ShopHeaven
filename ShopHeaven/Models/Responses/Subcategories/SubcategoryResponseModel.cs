using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Subcategories
{
    public class SubcategoryResponseModel : SubcategoryMainInfoResponseModel
    {
        public string CreatedBy { get; set; }
    }
}
