using ShopHeaven.Models.Requests.Subcategories;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface ISubcategoriesService
    {
        Task CreateSubcategoryAsync(CreateSubcategoryRequestModel model);
    }
}
