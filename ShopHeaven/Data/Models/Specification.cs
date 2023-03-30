using ShopHeaven.Data.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Specification : BaseModel
    {
        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public string Key { get; set; } // for example Material

        public string Value { get; set; } // for example Nylon
    }
}
