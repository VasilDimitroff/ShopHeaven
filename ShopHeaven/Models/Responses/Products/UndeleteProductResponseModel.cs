namespace ShopHeaven.Models.Responses.Products
{
    public class UndeleteProductResponseModel : ProductBaseResponseModel
    {

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
