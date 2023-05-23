using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models.Common
{
    public class BaseModel : IBaseModel, IDeletableModel
    {
        public BaseModel()
        {
            Id = Guid.NewGuid().ToString();
            CreatedOn = DateTime.UtcNow;
            IsDeleted = false;
            ModifiedOn = DateTime.UtcNow;
        }

        [Key]
        public string Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
