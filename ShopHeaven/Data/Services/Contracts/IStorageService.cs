namespace ShopHeaven.Data.Services.Contracts
{
    public interface IStorageService
    {
        Task<List<string>> UploadImageAsync(List<IFormFile> formFiles);
    }
}
