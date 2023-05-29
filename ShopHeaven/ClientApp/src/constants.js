//roles (synchronize with backend if you change it!!)
export const applicationUserRole = "User";
export const adminRole = "Administrator";

//unautorized message
export const noPermissionsForOperationMessage = "You have no permissions to perform the operation";

//username and password requirements
export const passwordRequiredLength = 8;
export const usernameRequiredLength = 2;

//records count per page in admin panel
export const usersPerPageInAdminPanel = 5; // how many users to view per page in admin panel
export const productsPerPageInAdminPanel = 5; // how many products to view per page in admin panel

//times for setTimer()
export const requestTimerMilliseconds = 500; // wait for user to type text in search fields
export const loadSubcategoriesInMainMenuTimerMilliseconds = 500; // time waiting before start new request in main menu when user move the mouse
export const hideSubmenuWhenUserIsOutsideTimerMilliseconds = 1000; // how much time to show submenu when user is outside of submenu

//home main menu
export const categoriesToShowInMainMenuIfScreenIsSm = 8;
export const categoriesToShowInMainMenuIfScreenIsMd = 10;

//home slider
export const labelCriteriaForProductsInHomeSlider = ["new", "hot"]; // filter main slider products by these labels
export const tagsCriteriaForProductsInHomeSlider = ["samsung", "indesit"]; // filter main slider products by these tags
export const productsCountInHomeSlider = 5; // how many product to show in main slider
