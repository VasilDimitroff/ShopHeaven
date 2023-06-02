namespace ShopHeaven.Models.Responses.Products
{
    public class ProductWithSimilarProductsResponseModel
    {
        public ProductResponseModel Product { get; set; }

        public ICollection<ProductGalleryResponseModel> SimilarProducts { get; set; }
    }
}
