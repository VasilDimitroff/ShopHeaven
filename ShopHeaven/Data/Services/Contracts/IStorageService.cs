namespace ShopHeaven.Data.Services.Contracts
{
    public interface IStorageService
    {
        Task<List<string>> UploadImageAsync(IEnumerable<IFormFile> formFiles, string userId);
    }
}
