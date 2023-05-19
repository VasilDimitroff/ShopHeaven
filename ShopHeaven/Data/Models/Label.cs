using ShopHeaven.Data.Models.Common;
using ShopHeaven.Data.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Label : BaseModel
    {
        public Label()
        {
            Products = new HashSet<ProductLabel>();
        }

        [Required(ErrorMessage="Content property cannot be empty")]
        public string Content { get; set; }

        public ICollection<ProductLabel> Products { get; set; } //products which contains this label
    }
}
