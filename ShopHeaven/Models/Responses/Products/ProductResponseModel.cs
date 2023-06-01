using ShopHeaven.Models.Responses.Categories.BaseModel;
using ShopHeaven.Models.Responses.Currencies;
using ShopHeaven.Models.Responses.Images.BaseModel;
using ShopHeaven.Models.Responses.Products.BaseModel;
using ShopHeaven.Models.Responses.Reviews;
using ShopHeaven.Models.Responses.Specifications;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Models.Responses.Products
{
    public class ProductResponseModel : ProductBaseResponseModel
    {
        public string Brand { get; set; }

        public string Description { get; set; }

        public bool HasGuarantee { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public int Quantity { get; set; }

        public bool isAvailable { get; set; }

        public double Rating { get; set; }

        public bool IsInUserCart { get; set; }

        public bool IsInUserWishlist { get; set; }

        public CategoryBaseResponseModel Category { get; set; }

        public SubcategoryBaseResponseModel Subcategory { get; set; }

        public CurrencyResponseModel Currency { get; set; }

        public ICollection<string> Tags { get; set; }

        public ICollection<string> Labels { get; set; }

        public ICollection<SpecificationResponseModel> Specifications { get; set; }

        public ICollection<BasicImageResponseModel> Images { get; set; }

        public ICollection<ReviewResponseModel> Reviews { get; set; }
    }
}
