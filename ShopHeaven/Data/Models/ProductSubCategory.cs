﻿using System.ComponentModel.DataAnnotations.Schema;

namespace ShopHeaven.Data.Models
{
    public class ProductSubCategory: IBaseModel, ICreatableModel, IDeletableModel
    {
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int SubCategoryId { get; set; }

        public virtual SubCategory SubCategory { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        [InverseProperty("ProductsSubCategories")]
        public virtual User CreatedBy { get; set; }
    }
}