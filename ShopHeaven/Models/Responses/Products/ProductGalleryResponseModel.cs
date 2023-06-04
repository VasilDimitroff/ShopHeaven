using ShopHeaven.Models.Responses.Products.BaseModel;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductGalleryResponseModel : ProductBaseResponseModel
    {
        public string Brand { get; set; }

        public string Currency { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public bool IsAvailable { get; set; }

        public double Rating { get; set; }

        public string Image { get; set; } //this is thumbnail

        public ICollection<string> Labels { get; set; }
    }
}
