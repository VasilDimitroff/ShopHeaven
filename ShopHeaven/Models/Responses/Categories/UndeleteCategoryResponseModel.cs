namespace ShopHeaven.Models.Responses.Categories
{
    public class UndeleteCategoryResponseModel : CategoryBaseModel
    {
        public int RevealedSubcategories { get; set; }

        public int RevealedProducts { get; set; }

        public int RevealedReviews { get; set; }

        public int RevealedTags { get; set; }

        public int RevealedCarts { get; set; }

        public int RevealedWishlists { get; set; }

        public int RevealedOrders { get; set; }

        public int RevealedLabels { get; set; }

        public int RevealedImages { get; set; }

        public int RevealedSpecifications { get; set; }
    }
}
