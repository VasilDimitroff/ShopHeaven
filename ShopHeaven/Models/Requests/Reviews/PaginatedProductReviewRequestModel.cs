﻿using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Reviews
{
    public class PaginatedProductReviewRequestModel : PaginationRequestModel
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
