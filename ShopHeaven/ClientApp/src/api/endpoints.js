export const apiUrl = "https://localhost:44349/";

export const ApiEndpoints = {
    exampleUserId: "fb88e2d4-24f4-411b-b14a-f727bf6e61b0",
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
        createCategory: apiUrl + "api/categories/create",
        editCategory: apiUrl + "api/categories/edit",
        getCategory: apiUrl + "api/categories/get?id=",
    },
    products: {
        createProduct: apiUrl + "api/products/create",
        editProduct: apiUrl + "api/products/edit",
        getProduct: apiUrl + "api/products/get"
    }
}

 