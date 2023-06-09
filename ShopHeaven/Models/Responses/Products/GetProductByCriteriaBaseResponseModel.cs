﻿using Microsoft.Build.Framework;
using ShopHeaven.Models.Responses.Categories;
using ShopHeaven.Models.Responses.Images.BaseModel;
using ShopHeaven.Models.Responses.Products.BaseModel;
using ShopHeaven.Models.Responses.Subcategories;

namespace ShopHeaven.Models.Responses.Products
{
    public class GetProductByCriteriaBaseResponseModel : ProductBaseResponseModel
    {
        public string Description { get; set; }

        public BasicImageResponseModel Image { get; set; }
    }
}
