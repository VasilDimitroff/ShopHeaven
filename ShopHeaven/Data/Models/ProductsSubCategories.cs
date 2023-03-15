namespace ShopHeaven.Data.Models
{
    public class ProductsSubCategories
    {
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int SubCategoryId { get; set; }

        public virtual SubCategory SubCategory { get; set; }
    }
}