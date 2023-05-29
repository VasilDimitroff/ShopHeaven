using ShopHeaven.Models.Requests.Images;
using ShopHeaven.Models.Responses.Images;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IImagesService
    {
        Task DeleteProductImageAsync(DeleteProductImageRequestModel model);

        Task SetImageAsProductThumbnailAsync(SetProductThumbnailRequestModel model);
    }
}
