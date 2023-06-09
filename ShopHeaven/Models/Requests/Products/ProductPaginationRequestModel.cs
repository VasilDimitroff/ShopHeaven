﻿using ShopHeaven.Models.Requests.Enumerations;

namespace ShopHeaven.Models.Requests.Products
{
    public class ProductPaginationRequestModel : PaginationRequestModel
    {
        public string? UserId { get; set; }

        public string SubcategoryId { get; set; }

        public double? Rating { get; set; } = 0;

        public bool? InStock { get; set; } = false;

        public decimal? LowestPrice { get; set; } = 0;

        public decimal? HighestPrice { get; set; } = 5000000;

        public string SortingCriteria { get; set; }

    }
}
