import axios from "../api/axios";
import { ApiEndpoints } from "../api/endpoints";
import { passwordRequiredLength } from "../constants";

export async function register(user){

    console.log("EMAIL: " + user.email);
    console.log("PASSWORD: " + user.password);
    console.log("CONFIRM PASSWORD: " + user.confirmPassword);

    const response = await axios.post(
        ApiEndpoints.auth.register,
        JSON.stringify({ email: user.email, password: user.password, confirmPassword: user.confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

    return response;
}

export async function login(user){

  console.log("LOGIN EMAIL: " + user.email);
  console.log("LOGIN PASSWORD: " + user.password);

  const response = await axios.post(
      ApiEndpoints.auth.login,
      JSON.stringify({ email: user.email, password: user.password}),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    
  return response;
}

export function validateEmail(email) {
    if(!email) {
      return false;
    }
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = EMAIL_REGEX.test(email);
    return isEmailValid;
}

export function validatePassword(password) {
    if (!password) {
      return false;
    }
   return password.length < passwordRequiredLength ? false : true
}

export function passwordsMatch(password, confirmPassword) {
    if(!password || !confirmPassword) {
      return false;
    }
    return password.trim() === confirmPassword.trim() ? true : false;
}