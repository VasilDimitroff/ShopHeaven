namespace ShopHeaven.Data.Models.Common
{
    public interface ICreatableModel
    {
        public string CreatedById { get; set; }

        public User CreatedBy { get; set; }
    }
}
