namespace ShopHeaven.Data.Models.Common
{
    public interface IDeletableModel
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
