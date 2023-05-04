import axios from "../api/axios";
import { ApiEndpoints } from "../api/endpoints";

export async function register(user){

    console.log("EMAIL: " + user.email);
    console.log("PASSWORD: " + user.password);
    console.log("CONFIRM PASSWORD: " + user.confirmPassword);

    const response = await axios.post(
        ApiEndpoints.auth.register,
        JSON.stringify({ email: user.email, password: user.password, confirmPassword: user.confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
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
        withCredentials: false,
      }
    );
    
  return response;
}

export function validateEmail(email) {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = EMAIL_REGEX.test(email);
    return isEmailValid;
}

export function validatePassword(password) {
   return password.length < 10 ? false : true
}

export function passwordsMatch(password, confirmPassword) {
    return password.trim() === confirmPassword.trim() ? true : false;
}