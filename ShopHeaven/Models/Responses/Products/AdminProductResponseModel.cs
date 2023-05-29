
using ShopHeaven.Models.Responses.Currencies;
using ShopHeaven.Models.Responses.Images;
using ShopHeaven.Models.Responses.Specifications;

namespace ShopHeaven.Models.Responses.Products
{
    public class AdminProductResponseModel : ProductBaseResponseModel
    {
        public string Brand { get; set; }

        public string Description { get; set; }

        public string CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string SubcategoryId { get; set; }

        public string SubcategoryName { get; set; }

        public bool HasGuarantee { get; set; }

        public CurrencyResponseModel Currency { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public int Quantity { get; set; }

        public int ReviewsCount { get; set; }

        public string CreatedBy { get; set; }

        public bool isAvailable { get; set; }

        public double Rating { get; set; }

        public ICollection<BasicImageResponseModel> Images { get; set; }

        public ICollection<string> Tags { get; set; }

        public ICollection<string> Labels { get; set; }

        public ICollection<SpecificationResponseModel> Specifications { get; set; }
    }
}
