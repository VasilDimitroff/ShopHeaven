using Duende.IdentityServer.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Responses.Categories
{
    public class GetCategoryResponseModel : GetCategoriesResponseModel
    {
        public string Description { get; set; }

        public string ImageUrl { get; set; }
    }
}
