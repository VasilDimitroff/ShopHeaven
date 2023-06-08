﻿namespace ShopHeaven
{
    public static class GlobalConstants
    {
        public const string SystemName = "ShopHeaven";

        public const string AdministratorRoleName = "Administrator";

        public const string UserRoleName = "User";

        public static int PasswordLength => 8;

        public static int UsernameLength => 2;

        public static int CouponExactRequiredLength => 8;

        public static IReadOnlyList<string> AllowedImageFileExtensions = new List<string>
        {
            ".jpeg",
            ".jpg",
            ".png",
            ".webp"
        };

        public const string UserWithThisUsernameAlreadyExist = "User with this username already exist!";

        public const string PasswordsDoesntMatch = "Password and Confirm Password doesn't match!";

        public const string PasswordNotValid = "Password is not valid!";

        public static string UsernameLengthNotEnough = $"Username cannot be empty. Required length is at least {UsernameLength} characters.";
       
        public static string PasswordLengthNotEnough = $"Password length must be at least {PasswordLength} characters long.";

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

        public const string ProductMustContainAtLeast1Tag = "Product must contain at least 1 tag";

        public const string ProductWithThisIdDoesNotExist = "Product with given Id does not exist!";

        public const string ImageWithGivenUrlDoesntExist = "Image with given Url does not exist!";

        public const string ImageIsNotAttachedToThisProduct = "Image is not attached to this product!";

        public const string ProductMustContainAtLeast1Image = "Product must contain at least 1 image";

        public const string UserIsAlreadyInThisRole = "User is already in this role!";

        public const string UserIsNotInTheSelectedRole = "User is not in the role you selected!";

        public const string CannotRemoveUserFromUserRole = $"Cannot remove user from {UserRoleName} role";

        public const string RatingContentCannotBeEmpty = $"Rating Content must contain at least 2 characters";

        public const string RoleWithThisIdDoesNotExist = "Role with given Id does not exist!";

        public const string CartDoesNotExist = "Cart with given Id does not exist!";

        public const string CannotAddProductToOtherCarts = "You cannot add products to other carts!";

        public const string YouCanSeeOnlyYourCartProducts = "You can see only your cart products!";

        public const string MinimumQuantityToAddProductInCart = "Minimum quantity to add product in cart is 1!";

        public const string NotEnoughProductQuantity = "You're trying to add more quantity of this product than quantity is in stock!";

        public const string AppCurrencyNotFound = "Cannot find the app currency!";

        public const string YouCanDeleteProductsFromYourCartsOnly = "You can delete products from your cart only!";

        public const string ProductIsNotInTheCart = "Product does not exist in your cart!";

        public const string ProductInCartNotFound = "Searched product not found in the cart!";

        public const string CouponWrongLength = "Coupon must be exact 8 characters long";

        public const string CouponWithThisCodeAlreadyExist = "Coupon with given code already exist!";

        public const string CouponAmountCannotBeNegativeNumber = "Coupon amount must be bigger or equals to 0!";

        public const string CouponWithThisCodeDoesNotExist = "Coupon with given code does not exist";

        public const string CouponWithThisIdDoesntExist = "Coupon with given Id does not exist";

        public const string CurrentQuantityPlusWantedQuantityIsMoreThanQuantityInStock
            = "Quantity of this product in your cart + quantity you want to add is more than quantity in stock!";

        public const string FileTypeNotAllowed 
            = "File type you uploaded is not supported! Supported file types are .jpeg, .jpg, .png and .webp";
    }
}
