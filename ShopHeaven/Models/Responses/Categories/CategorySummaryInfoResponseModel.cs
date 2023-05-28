namespace ShopHeaven.Models.Responses.Categories
{
    public class CategorySummaryInfoResponseModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public int SubcategoriesCount { get; set; }

        public int ProductsCount { get; set; }
    }
}
