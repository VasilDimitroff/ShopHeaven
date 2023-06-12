namespace ShopHeaven.Models.Responses.Orders
{
    public class OrdersAndStatusesResponseModel
    {
        public ICollection<OrderResponseModel> Orders { get; set; }

        public ICollection<string> OrderStatuses { get; set; }

        public int OrdersCount { get; set; }

        public int PagesCount { get; set; }
    }
}
