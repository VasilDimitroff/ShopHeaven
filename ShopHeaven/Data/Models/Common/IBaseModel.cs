namespace ShopHeaven.Data.Models.Common
{
    public interface IBaseModel
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
