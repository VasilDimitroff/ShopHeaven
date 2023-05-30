using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductsBySubcategoryResponseModel
    {
        public ICollection<ProductGalleryResponseModel> Products { get; set; }

        public CategoryBaseResponseModel Category { get; set; }

        public SubcategoryBaseResponseModel Subcategory { get; set; }

        public int ProductsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
