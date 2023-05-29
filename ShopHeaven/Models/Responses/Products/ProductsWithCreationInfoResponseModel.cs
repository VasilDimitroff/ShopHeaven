using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Currencies;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductsWithCreationInfoResponseModel
    {
        public ICollection<AdminProductResponseModel> Products { get; set; }

        public ICollection<CategoryWithSubcategoriesResponseModel> Categories { get; set; }

        public ICollection<CurrencyResponseModel> Currencies { get; set; }

        public int ProductsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
