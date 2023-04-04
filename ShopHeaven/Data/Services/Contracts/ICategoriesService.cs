using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICategoriesService
    {
        Task CreateCategory(CreateCategoryRequestModel model);

        Task<GetCategoryResponseModel> GetCategoryById(string id);

        Task<string> DeleteCategory(DeleteCategoryRequestModel model);
    }
}
