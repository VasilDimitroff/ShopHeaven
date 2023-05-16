﻿namespace ShopHeaven.Models.Responses.Categories
{
    public class DeleteCategoryResponseModel
    {
        public string CategoryId { get; set; }

        public string Name { get; set; }

        public int DeletedSubcategories { get; set; }

        public int DeletedProducts { get; set; }

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
