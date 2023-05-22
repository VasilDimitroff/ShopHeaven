using ShopHeaven.Models.Requests.Images;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IImagesService
    {
        Task DeleteProductImageAsync(DeleteProductImageRequestModel model);
    }
}
