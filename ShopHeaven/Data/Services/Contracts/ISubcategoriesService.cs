using ShopHeaven.Models.Requests.Subcategories;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ISubcategoriesService
    {
        Task<SubcategoriesResponseModel> CreateSubcategoryAsync(CreateSubcategoryRequestModel model);

        Task<SubcategoriesResponseModel> EditSubcategoryAsync(EditSubcategoryRequestModel model);

        Task<DeleteSubcategoryResponseModel> DeleteSubcategoryAsync(DeleteSubcategoryRequestModel model, bool delete);
    }
}
