using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Image : GuidModel, IBaseModel
    {
        public string Url { get; set; }

        [Required]
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
