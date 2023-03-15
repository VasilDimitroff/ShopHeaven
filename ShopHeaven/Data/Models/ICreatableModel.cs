namespace ShopHeaven.Data.Models
{
    public interface ICreatableModel
    {
        public int CreatedById { get; set; }

        public User CreatedBy { get; set; }
    }
}
