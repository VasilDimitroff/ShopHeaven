export const apiUrl = "https://localhost:44349/";

export const ApiEndpoints = {
    auth:{
        register: "api/auth/register",
        login: "api/auth/login",
        logout: "api/auth/logout",
        refreshToken: "api/auth/refreshToken"
    },
    users: {
        getAll: "api/users/getall"
    },
    categories: {
        createCategory: "api/categories/create",
        editCategory: "api/categories/edit",
        getAll: "api/categories/getall",
        getCategory: apiUrl + "api/categories/get?id=",
    },
    subcategories: {
        createSubcategory : "api/subcategories/create",
        editSubcategory: "api/subcategories/edit"
    },
    products: {
        createProduct: apiUrl + "api/products/create",
        editProduct: apiUrl + "api/products/edit",
        getProduct: apiUrl + "api/products/get"
    }
}

 