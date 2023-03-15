namespace ShopHeaven.Data.Models
{
    public class ProductsMainCategories
    {
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int MainCategoryId { get; set; }

        public virtual MainCategory MainCategory { get; set; }
    }
}
