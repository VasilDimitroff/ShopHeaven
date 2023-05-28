using Microsoft.AspNetCore.Identity;
using ShopHeaven.Models.Requests;
using ShopHeaven.Models.Requests.Categories;
using ShopHeaven.Models.Responses.Categories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ICategoriesService
    {
        Task<GetCategoriesResponseModel> CreateCategoryAsync(CreateCategoryRequestModel model);

        Task<EditCategoryResponseModel> EditCategoryAsync(EditCategoryRequestModel model);

        Task<GetCategoriesResponseModel> GetCategoryByIdAsync(string id);

        Task<List<CategorySummaryInfoResponseModel>> GetCategoriesSummaryInfoAsync();

        Task<List<GetCategoriesResponseModel>> GetAllCategoriesAsync();

        Task<List<CategoryNamesResponseModel>> GetAllCategoryNamesAsync();

        Task<CategoryBaseModel> DeleteCategoryAsync(DeleteCategoryRequestModel model, bool delete);
    }
}
