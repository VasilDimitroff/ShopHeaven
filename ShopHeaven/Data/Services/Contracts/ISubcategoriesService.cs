using ShopHeaven.Models.Requests.Subcategories;
using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Subcategories;
using ShopHeaven.Models.Responses.Subcategories.BaseModel;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ISubcategoriesService
    {
        Task<SubcategoryResponseModel> CreateSubcategoryAsync(CreateSubcategoryRequestModel model);

        Task<SubcategoryResponseModel> EditSubcategoryAsync(EditSubcategoryRequestModel model);

        Task<SubcategoryBaseResponseModel> DeleteSubcategoryAsync(BasicSubcategoryRequestModel model, bool delete);

        Task<SubcategoriesByCategoryIdResponseModel> GetSubcategoriesByCategoryId(SubcategorySummaryRequestModel model);
    }
}
