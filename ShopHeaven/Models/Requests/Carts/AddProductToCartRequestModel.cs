﻿using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Carts
{
    public class AddProductToCartRequestModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string CartId { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
