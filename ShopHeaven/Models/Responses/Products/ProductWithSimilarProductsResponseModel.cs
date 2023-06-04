namespace ShopHeaven.Models.Responses.Products
{
    public class ProductWithSimilarProductsResponseModel
    {
        public ProductResponseModel Product { get; set; }

        public ICollection<ProductGalleryResponseModel> SimilarProducts { get; set; }

        public int ReviewsCount { get; set; }

        public int PagesCount { get; set; }
    }
}
