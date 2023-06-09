﻿using ShopHeaven.Models.Responses.Products.BaseModel;

namespace ShopHeaven.Models.Responses.Products
{
    public class DeleteProductResponseModel : ProductBaseResponseModel
    {
        public int DeletedReviews { get; set; }

        public int DeletedTags { get; set; }

        public int DeletedCarts { get; set; }

        public int DeletedWishlists { get; set; }

        public int DeletedOrders { get; set; }

        public int DeletedLabels { get; set; }

        public int DeletedImages { get; set; }

        public int DeletedSpecifications { get; set; }
    }
}
