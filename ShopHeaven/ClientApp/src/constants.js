//roles (synchronize with backend if you change it!!)
export const applicationUserRole = "User";
export const adminRole = "Administrator";

//urls
export const loginPath = `/login`;
export const registerPath = `/register`;
export const allCategoriesUrl = `/categories`;
export const subcategoriesOfMainCategoryBaseUrl =`/categories/`;
export const subcategoryProductsBaseUrl =`/subcategories/`;
export const singleProductBasePath =`/products/`;
export const cartPath =`/cart`;
export const favoritesPath =`/favorites`;
export const checkoutPath =`/order/checkout`;
export const successPaymentPath =`/payment/success`;
export const myAccountPath =`/account`;
export const myReviewsPath =`/reviews`;
export const myOrdersPath =`/orders`;

//unautorized message
export const noPermissionsForOperationMessage = "You have no permissions to perform the operation";

//username and password requirements
export const passwordRequiredLength = 8;
export const usernameRequiredLength = 2;

//records count per page in admin panel
export const usersPerPageInAdminPanel = 5; // how many users to view per page in admin panel
export const productsPerPageInAdminPanel = 5; // how many products to view per page in admin panel
export const ordersPerPageInAdminPanel = 5; // how many orders to view per page in admin panel
export const reviewsPerPageInAdminPanel = 5; // how many reviews to view per page in admin panel

//records count per page in single subcategory products page - for product gallery
export const productsPerPageInSubCategoryPage = 20;

//price range filters - for product gallery

//max price in the app - look and in the backend
// if you want to change eighthGroupProductPriceRange Max to something else, look at this and in SubcategoryProducts request
export const maxApplicationPrice = "5000000"; 
export const maxProductPriceRangeGroup = `0 - ${maxApplicationPrice}`; // it will not apply price filter
export const firstGroupProductPriceRange = "0 - 50";
export const secondGroupProductPriceRange = "51 - 100";
export const thirdGroupProductPriceRange = "101 - 200";
export const forthGroupProductPriceRange = "201 - 500";
export const fifthGroupProductPriceRange = "501 - 1000";
export const sixthGroupProductPriceRange = "1001 - 1500";
export const seventhGroupProductPriceRange = "1501 - 2000";
export const eighthGroupProductPriceRange = "2001 - MAX";

// rating filters - for product gallery
export const initialRatingFilterValue = 0; // it will not apply rating filter
export const oneStarRatingValue = 1;
export const twoStarsRatingValue = 2;
export const threeStarsRatingValue = 3;
export const fourStarsRatingValue = 4;
export const fiveStarsRatingValue = 5;

// sorting products criterias values - for product gallery! Important to be same as backend enum
export const sortByNewest = "DateDescending";
export const sortByPriceDescending = "PriceDescending";
export const sortByPriceAscending = "PriceAscending";
export const sortByDiscountPercentDescending = "PercentDiscountDescending";
export const sortByRating = "Rating";

//sorting products in admin panel producs. Important to be same as backend enum
export const productsSortingCriteriaInAdminProductsPanel = sortByNewest;

//Sorting criteria for first carousel with products in home page. Important to be same as backend enum
export const firstProductCarouselSortingCriteria = sortByDiscountPercentDescending;
//home carousel products count per slider
export const productsPerSliderInHomePage = 12;

// how many similar products to get for single product page slider below main info
export const similarProductsForSingleProductPageSlider = 12;

//home slider
export const labelCriteriaForProductsInHomeSlider = ["hot"]; // filter main slider products by these labels
export const productsCountInHomeSlider = 5; // how many product to show in main slider

//home main menu
export const categoriesToShowInMainMenuIfScreenIsSm = 8;
export const categoriesToShowInMainMenuIfScreenIsMd = 10;

//times for setTimer()
export const requestTimerMilliseconds = 500; // wait for user to type text in search fields
export const loadSubcategoriesInMainMenuTimerMilliseconds = 0; // time waiting before start new request in main menu when user move the mouse
export const hideSubmenuWhenUserIsOutsideTimerMilliseconds = 1000; // how much time to show submenu when user is outside of submenu

//categories page
export const columnsWithCategoriesToShowIfScreenIsMd = 2;
export const columnsWithCategoriesToShowIfScreenIsLg = 4;

//subcategories page
export const columnsWithSubcategoriesToShowIfScreenIsMd = 2;
export const columnsWithSubcategoriesToShowIfScreenIsLg = 4;

//allowed file formats in upload image functionality (sync it with backend)
export const allowedFileFormats = ".jpg, .png, .jpeg, .webp"

//how many reviews per page in reviews page in admin panel
export const reviewsPerPageInProductPage = 3;

// show reviews in product page only with this status
export const reviewsFilterStatusForSingleProductPage = "Approved";

//how many reviews per page in MyReviews page
export const reviewsPerPageInMyReviewsPage = 5;

//exact length of the coupon code (sync it with backend)
export const couponCodeLength = 8;
