using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Products;
using ShopHeaven.Models.Responses.Products.BaseModel;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IProductsService
    {
        Task<AdminProductResponseModel> CreateProductAsync(CreateProductRequestModel model);

        Task<ProductsWithCreationInfoResponseModel> GetAllWithCreationInfoAsync(ProductPaginationRequestModel model);

        Task<ICollection<AdminProductResponseModel>> GetAllAsync(ProductPaginationRequestModel model);

        Task<ICollection<GetProductByLabelsResponseModel>> GetProductsByLabelsAsync(GetProductsByLabelRequestModel model);

        Task<AdminProductResponseModel> EditProductAsync(EditProductRequestModel model);

        Task<ProductBaseResponseModel> DeleteProductAsync(DeleteProductRequestModel model, bool delete);
    }
}
