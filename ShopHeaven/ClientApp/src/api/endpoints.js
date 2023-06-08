export const apiUrl = "https://localhost:44349/";

export const ApiEndpoints = {
    auth:{
        register: "api/auth/register",
        login: "api/auth/login",
        logout: "api/auth/logout",
        refreshToken: "api/auth/refreshToken"
    },
    users: {
        getAll: "api/users/getall",
        editUser: "api/users/edit",
        deleteUser: "api/users/delete",
        undeleteUser: "api/users/undelete",
        addUserToRole: "api/users/addToRole",
        removeUserFromRole: "api/users/removeFromRole"
    },
    currencies: {
        getAll: "api/currencies/getall",
        getAppCurrency: "api/currencies/getAppCurrency",
        setAppCurrency: "api/currencies/setAppCurrency"  
    },
    categories: {
        createCategory: "api/categories/create",
        editCategory: "api/categories/edit",
        getAll: "api/categories/getAll",
        deleteCategory: "api/categories/delete",
        undeleteCategory: "api/categories/undelete",
        getCategoriesSummary: "api/categories/getCategoriesSummary",
        getCategoryNames: "api/categories/getcategorynames",
    },
    subcategories: {
        createSubcategory : "api/subcategories/create",
        editSubcategory: "api/subcategories/edit",
        deleteSubcategory: "api/subcategories/delete",
        undeleteSubcategory: "api/subcategories/undelete",
        byCategoryId: "api/subcategories/byCategoryId"
    },
    products: {
        getById: "api/products/getById",
        createProduct: "api/products/create",
        editProduct: "api/products/edit",
        getAllWithCreationInfo: "api/products/getAllWithCreationInfo",
        getBySubcategoryId: "api/products/getBySubcategoryId",
        getByLabels: "api/products/getByLabels",
        deleteProduct: "api/products/delete",
        undeleteProduct: "api/products/undelete",
    },
    images: {
        deleteProductImage: "api/images/delete",
        setThumbnail: "api/images/setThumbnail"
    },
    reviews: {
        createReview: "api/reviews/create",
        allByProductId: "api/reviews/allByProductId"
    },
    carts: {
        addProduct: "api/carts/addProduct",
        getProducts: "api/carts/getProducts",
        deleteProduct: "api/carts/deleteProduct",
        changeProductQuantity: "api/carts/changeProductQuantity",
    },
    coupons: {
        createCoupon: "api/coupons/create",
        editCoupon: "api/coupons/edit",
        getAll: "api/coupons/getAll",
        deleteCoupon: "api/coupons/delete",
        undeleteCoupon: "api/coupons/undelete",
        verifyCoupon: "api/coupons/verify"
    }
}