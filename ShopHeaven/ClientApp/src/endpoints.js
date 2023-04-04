const apiUrl = "https://localhost:44349/";

export const ApiEndpoints = {
    categories: {
        createCategory: apiUrl + "api/categories/create",
        editCategory: apiUrl + "api/categories/edit",
        getCategory: apiUrl + "api/categories/get?id=",
    },
}

 