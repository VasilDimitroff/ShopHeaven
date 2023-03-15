namespace ShopHeaven.Data.Models
{
    public interface IBaseModel
    {
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
