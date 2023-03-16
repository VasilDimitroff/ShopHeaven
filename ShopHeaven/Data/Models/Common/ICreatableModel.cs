namespace ShopHeaven.Data.Models.Common
{
    public interface ICreatableModel
    {
        public int CreatedById { get; set; }

        public User CreatedBy { get; set; }
    }
}
