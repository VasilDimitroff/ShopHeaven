namespace ShopHeaven
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

        public const string ChangePasswordFailed = "Error occurred! Password not changed!";

        public const string PasswordMustContainsLettersAndDigits = "Password must contains letters and digits!";

        public const string NoPermissionsToPerformOperation = "You have no permissions to perform this operation!";

        public const string UserDoesNotExist = "User with given Id doesn't exists!";

        public const string UserNotFound = "User is not found!";

        public const string UserWithThisEmailAlreadyExists = "User with this email already exists!";

        public const string UserWithThisUsernameAlreadyExists = "User with this username already exists!";

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

        public const string RecipientCannotBeEmpty = "Recipient cannot be empty or whitespace";

        public const string PhoneCannotBeEmpty = "Phone cannot be empty or whitespace";

        public const string CountryCannotBeEmpty = "Country cannot be empty or whitespace";

        public const string CityCannotBeEmpty = "City cannot be empty or whitespace";

        public const string AddressCannotBeEmpty = "Address cannot be empty or whitespace";

        public const string ShippingMethodCannotBeEmpty = "Shipping method cannot be empty or whitespace";

        public const string InvalidShippingMethod = "Shipping method is invalid!";

        public const string PaymentMethodCannotBeEmpty = "Payment method cannot be empty or whitespace";

        public const string PaymentMethodIsInvalid = "Payment method is invalid!";

        public const string PaymentSessionNotFound = "Payment session with this Id not found!";

        public const string OrderNotFound = "Order with this Id not found!";

        public const string OrderAlreadyDeleted = "Order with this Id is already deleted!";

        public const string ReviewAlreadyDeleted = "Review with this Id is already deleted!";

        public const string OrderAlreadyUndeleted = "You cannot undelete this order because it is not deleted!";

        public const string ReviewAlreadyUndeleted = "You cannot undelete this review because it is not deleted!";

        public const string ReviewNotFound = "Review with this Id not found!";

        public const string WishlistNotFound = "Wishlist with this Id not found!";

        public const string ProductAlreadyExistsInWishlist = "Product already exists in the wishlist!";

        public const string CannotAddProductsInOthersWishlists = "You can add products in your wishlist only!";

        public const string ProductIsNotInWishlist = "Product is not in the wishlist!";

        public const string YouCanSeeOnlyYourWishlist = "You can see only your wishlist!";

        public const string NameCannotBeEmpty = "Name cannot be empty!";

        public const string CurrentQuantityPlusWantedQuantityIsMoreThanQuantityInStock
            = "Quantity of this product in your cart + quantity you want to add is more than quantity in stock!";

        public const string FileTypeNotAllowed 
            = "File type you uploaded is not supported! Supported file types are .jpeg, .jpg, .png and .webp";
    }
}
