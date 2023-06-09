﻿using System.ComponentModel.DataAnnotations;

namespace ShopHeaven.Models.Requests.Users
{
    public class EditUserRequestModel : UserBaseRequestModel
    {
        [Required]
        [MinLength(2)]
        public string Username { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }
}
