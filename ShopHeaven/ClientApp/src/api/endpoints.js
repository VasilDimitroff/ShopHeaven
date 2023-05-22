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
    currencies: {
        getAll: "api/currencies/getall"    
    },
    categories: {
        createCategory: "api/categories/create",
        editCategory: "api/categories/edit",
        getAll: "api/categories/getall",
        deleteCategory: "api/categories/delete",
        undeleteCategory: "api/categories/undelete",
        getCategoryNames: "api/categories/getcategorynames",
        getCategory: apiUrl + "api/categories/get?id=",
    },
    subcategories: {
        createSubcategory : "api/subcategories/create",
        editSubcategory: "api/subcategories/edit",
        deleteSubcategory: "api/subcategories/delete",
        undeleteSubcategory: "api/subcategories/undelete"
    },
    products: {
        createProduct: "api/products/create",
        editProduct: apiUrl + "api/products/edit",
        getAllWithCreationInfo: "api/products/getallwithcreationinfo",
        getProduct: apiUrl + "api/products/get"
    }
}

 