using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class GuidModel
    {
        public GuidModel()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }
    }
}
