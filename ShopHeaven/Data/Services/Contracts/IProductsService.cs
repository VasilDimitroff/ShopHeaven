using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Products;
using ShopHeaven.Models.Responses.Products.BaseModel;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IProductsService
    {
        Task<Product> GetProductAsync(string id);

        Task<AdminProductResponseModel> CreateProductAsync(CreateProductRequestModel model);

        Task<AdminProductResponseModel> EditProductAsync(EditProductRequestModel model);

        Task<ProductBaseResponseModel> DeleteProductAsync(DeleteProductRequestModel model, bool delete);

        Task<ProductResponseModel?> GetFullProductDataAsync(ProductRequestModel model);

        Task<ICollection<AdminProductResponseModel>> GetAllAsync(AdminProductPaginationRequestModel model);

        Task<int> GetProductsCount(AdminProductPaginationRequestModel model);

        Task<ProductsBySubcategoryResponseModel> GetAllBySubcategoryIdAsync(ProductPaginationRequestModel model);

        Task<ICollection<GetProductByLabelsResponseModel>> GetProductsByLabelsAsync(GetProductsByLabelRequestModel model);


        Task<List<ProductGalleryResponseModel>> GetSimilarProductsByProductIdAsync(ProductRequestModel model);

    }
}
