using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Currencies;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductsWithCreationInfoResponseModel
    {
        public ICollection<CreateProductResponseModel> Products { get; set; }

        public ICollection<CategoryNamesResponseModel> Categories { get; set; }

        public ICollection<CurrencyResponseModel> Currencies { get; set; }
    }
}
