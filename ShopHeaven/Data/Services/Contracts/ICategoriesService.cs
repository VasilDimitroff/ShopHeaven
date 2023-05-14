using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Requests.Categories;
using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICategoriesService
    {
        Task CreateCategoryAsync(CreateCategoryRequestModel model);

        Task EditCategoryAsync(EditCategoryRequestModel model);

        Task<GetCategoriesResponseModel> GetCategoryByIdAsync(string id);

        Task<List<GetCategoriesResponseModel>> GetAllCategoriesAsync();

        Task<string> DeleteCategoryAsync(DeleteCategoryRequestModel model);
    }
}
