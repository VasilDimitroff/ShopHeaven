using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Data.Models
{
    public class Rating : GuidModel
    {
        public int UserId { get; set; }

        public virtual User User { get; set; }

        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int Value { get; set; }
    }
}