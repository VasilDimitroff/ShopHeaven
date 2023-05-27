using ShopHeaven.Models.Requests.Products;
using ShopHeaven.Models.Responses.Products;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IProductsService
    {
        Task<AdminProductResponseModel> CreateProductAsync(CreateProductRequestModel model);

        Task<ProductsWithCreationInfoResponseModel> GetAllWithCreationInfoAsync(ProductPaginationRequestModel model);

        Task<ICollection<AdminProductResponseModel>> GetAllAsync(ProductPaginationRequestModel model);

        Task<AdminProductResponseModel> EditProductAsync(EditProductRequestModel model);

        Task<DeleteProductBaseResponseModel> DeleteProductAsync(DeleteProductRequestModel model, bool delete);
    }
}
