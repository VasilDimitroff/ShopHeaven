using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICategoriesService
    {
        Task CreateCategoryAsync(CreateCategoryRequestModel model);

        Task<GetCategoryResponseModel> GetCategoryByIdAsync(string id);

        Task<List<GetCategoriesResponseModel>> GetAllCategoriesAsync();

        Task<string> DeleteCategoryAsync(DeleteCategoryRequestModel model);
    }
}
