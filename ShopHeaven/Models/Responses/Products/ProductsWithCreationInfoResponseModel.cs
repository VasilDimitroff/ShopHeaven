using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductsWithCreationInfoResponseModel
    {
        public ICollection<AdminProductResponseModel> Products { get; set; }

        public ICollection<CategoryWithSubcategoriesResponseModel> Categories { get; set; }

        public int ProductsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
