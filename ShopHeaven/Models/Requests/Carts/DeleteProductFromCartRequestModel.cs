﻿namespace ShopHeaven.Models.Requests.Carts
{
    public class DeleteProductFromCartRequestModel
    {
        public string UserId { get; set; }

        public string CartId { get; set; }

        public string ProductId { get; set; }
    }
}
