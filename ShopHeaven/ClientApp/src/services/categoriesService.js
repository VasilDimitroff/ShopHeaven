import axios from "../api/axios";
import { ApiEndpoints } from "../api/endpoints";

export async function createCategory(formData, token){

  const response = await axios.post(
    ApiEndpoints.categories.createCategory,
    formData,
    {
      headers: {  'Authorization': `Bearer ${token}` },
      withCredentials: true,
    }
  );

    return response;
}

export async function createSubcategory(formData, token){
  console.log("FORM DATA: " + formData);
  const response = await axios.post(
    ApiEndpoints.subcategories.createSubcategory,
    formData,
    {
      headers: {  'Authorization': `Bearer ${token}` },
      withCredentials: true,
    }
  );

    return response;
}