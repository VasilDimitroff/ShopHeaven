﻿using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Orders;
using ShopHeaven.Models.Responses.Orders;

namespace ShopHeaven.Data.Services.Contracts
{
    public interface IOrdersService
    {
        Task<CheckoutResponseModel> GetCheckoutInfoAsync(CheckoutRequestModel model);

        Task<Order> RegisterOrderAsync(CreateOrderRequestModel model);

        Task<OrderSummaryResponseModel> GetPaymentInfo(CreateOrderRequestModel model);

        Task<ICollection<ProductOrder>> GetOrderProductsAsync(string orderId);

        Task ReduceQuantityOfProductsAsync(string orderId);
    }
}
