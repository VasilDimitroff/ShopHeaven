namespace ShopHeaven.Data.Models
{
    public interface IDeletableModel
    {
        public bool IsDeleted { get; set; }
        public DateTime DeletedOn { get; set; }
    }
}
