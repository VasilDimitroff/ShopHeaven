namespace ShopHeaven.Models.Responses.Coupons
{
    public class CouponResponseModel : CouponBaseResponseModel
    {
        public string Id { get; set; }

        public int OrdersCount { get; set; }
    }
}
