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

export async function editCategory(formData, token){
  console.log(formData);
  const response = await axios.post(
    ApiEndpoints.categories.editCategory,
    formData,
    {
      headers: {  'Authorization': `Bearer ${token}` },
      withCredentials: true,
    }
  );

    return response;
}

export async function deleteCategory(categoryId, token){

  const response = await axios.post(
    ApiEndpoints.categories.deleteCategory,
    JSON.stringify({ categoryId: categoryId}),
    {
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
       },
      withCredentials: true,
    }
  );

  return response;
}

export async function undeleteCategory(categoryId, token){

  const response = await axios.post(
    ApiEndpoints.categories.undeleteCategory,
    JSON.stringify({ categoryId: categoryId}),
    {
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
       },
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

export async function editSubcategory(formData, token){
  console.log(formData);
  const response = await axios.post(
    ApiEndpoints.subcategories.editSubcategory,
    formData,
    {
      headers: {  'Authorization': `Bearer ${token}` },
      withCredentials: true,
    }
  );

    return response;
}