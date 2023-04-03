using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICategoriesService
    {
        Task CreateCategory(CreateCategoryRequestModel model);

        Task<string> DeleteCategory(DeleteCategoryRequestModel model);
    }
}
