using Microsoft.AspNetCore.Identity;
using System.Xml;

namespace ShopHeaven.Data.Models
{
    public class User : IdentityUser, IDeletableModel, IBaseModel
    {
        public User()
        {
            Ratings = new HashSet<Rating>();
        }

        public bool IsDeleted { get; set; }

        public DateTime DeletedOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }
    }
}