﻿namespace ShopHeaven
{
    public static class GlobalConstants
    {
        public const string SystemName = "ShopHeaven";

        public const string AdministratorRoleName = "Administrator";

        public const string UserRoleName = "User";

        public const string UserWithThisUsernameAlreadyExist = "User with this username already exist!";

        public const string PasswordsDoesntMatch = "Password and Confirm Password doesn't match!";

        public const string PasswordNotValid = "Password ais not valid!";

        public const string UserDoesNotExist = "User with given Id doesn't exists!";

        public const string UserNotFound = "User is not found!";

        public const string UserWithThisEmailAlreadyExists = "User with this email already exists!";

        public const string UserSuccessfullyRegistered = "User is registered successfully!";

        public const string UserNotCreated = "User is not created!";

        public const string CategoryWithThisNameAlreadyExist = "Category with given name already exists!";

        public const string CategoryWithThisIdDoesntExist = "Category with given Id doesn't exists!";

        public const string CurrencyWithThisIdDoesntExist = "Currency with given Id doesn't exists!";

        public const string SubcategoryWithThisIdDoesntExist = "Subcategory with given Id doesn't exists!";

        public const string CategoryNameCannotBeEmpty = "Category Name cannot be empty!";
        
        public const string CategoryImageCannotBeEmpty = "Category Image cannot be empty!";

        public const string SubcategoryNameCannotBeEmpty = "Subcategory name cannot be empty!";

        public const string UserHaveNoPermissionsToDeleteCategories = "You have no permissions to delete categories!";

        public const string RefreshTokenCookieName = "refreshToken";

        public const string SuccessfullLogout = "You are successfully logout!";

        public const string ProductNameNotEnoughLength = "Product Name is too short! It must contain at least 2 symbols";
       
        public const string ProductDescriptionNotEnoughLength = "Product Description is too short! It must contain at least 2 symbols";
        
        public const string ProductPriceCannotBeNegativeNumber = "Product Price cannot be negative number";
        
        public const string ProductDiscountCannotBeNegativeNumber = "Product Discount cannot be negative number";
        
        public const string ProductQuantityCannotBeNegativeNumber = "Product Quantity cannot be negative number";

        public const string ProductMustContainAtLeast1Tag = "Product Must Contain At Least 1 Tag";
    }
}
