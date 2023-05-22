using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using ShopHeaven.Data.Services.Contracts;

namespace ShopHeaven.Data.Services
{
    public class StorageService : IStorageService
    {
        private readonly BlobServiceClient serviceClient;
        private readonly IConfiguration configuration;

        public StorageService(BlobServiceClient serviceClient, IConfiguration configuration)
        {
            this.serviceClient = serviceClient;
            this.configuration = configuration;
        }

        public async Task<List<string>> UploadImageAsync(IEnumerable<IFormFile> files, string userId)
        {
            //TODO: Validate file
            var containerName = configuration.GetSection("Storage:ContainerName").Value;
            var containerClient = this.serviceClient.GetBlobContainerClient(containerName);

            var imageUrls = new List<string>();

            foreach (IFormFile file in files)
            {
                var blobClient = containerClient.GetBlobClient(GetFileName(file.FileName, userId));

                using var stream = file.OpenReadStream();

                try
                {
                    Response<BlobContentInfo> response = await blobClient.UploadAsync(stream);
                    imageUrls.Add(blobClient.Uri.AbsoluteUri);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return imageUrls;
        }

        private string GetFileName(string fileName, string userId)
        {
            string extension = Path.GetExtension(fileName);

            if (!GlobalConstants.AllowedImageFileExtensions.Contains(extension))
            {
                throw new ArgumentException(GlobalConstants.FileTypeNotAllowed);
            }

            string randomNumber = new Random().Next(100, int.MaxValue).ToString();
            string secondRandomNumber = new Random().Next(100, int.MaxValue).ToString();
            string fileNameWithoutExt = Path.GetFileNameWithoutExtension(fileName);

            if (fileNameWithoutExt.Length > 15)
            {
                fileNameWithoutExt = fileNameWithoutExt.Substring(0, 15);
            }

            string basePath = $"{GlobalConstants.SystemName}/{userId}/";

            string fullPathName =
                basePath + fileNameWithoutExt + "_" + randomNumber + "_" + secondRandomNumber + extension;

            return fullPathName;
        }
    }
}
