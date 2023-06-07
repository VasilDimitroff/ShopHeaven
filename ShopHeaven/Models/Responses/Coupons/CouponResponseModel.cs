namespace ShopHeaven.Models.Responses.Coupons
{
    public class CouponResponseModel
    {
        public string Id { get; set; }

        public string Code { get; set; }

        public double Amount { get; set; }

        public int OrdersCount { get; set; }
    }
}
