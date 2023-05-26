namespace ShopHeaven
{
    public static class GlobalConstants
    {
        public const string SystemName = "ShopHeaven";

        public const string AdministratorRoleName = "Administrator";

        public const string UserRoleName = "User";

        public static int PasswordLength => 8;

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

        public const string ProductWithThisIdDoesNotExist = "Product with this Id does not exist!";

        public const string ImageWithGivenUrlDoesntExist = "Image with given Url does not exist!";

        public const string ImageIsNotAttachedToThisProduct = "Image is not attached to this product!";

        public const string ProductMustContainAtLeast1Image = "Product must contain at least 1 image";

        public const string UserIsAlreadyInThisRole = "User is already in this role!";

        public const string UserIsNotInTheSelectedRole = "User is not in the role you selected!";

        public const string CannotRemoveUserFromUserRole = $"Cannot remove user from {UserRoleName} role";

        public const string RoleWithThisIdDoesNotExist = "Role with this Id does not exist!";

        public const string FileTypeNotAllowed 
            = "File type you uploaded is not supported! Supported file types are .jpeg, .jpg, .png and .webp";
    }
}
