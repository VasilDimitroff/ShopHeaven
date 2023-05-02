import axios from "axios";
import { ApiEndpoints } from "../endpoints";

export async function registerUser(user){

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

    console.log("IN AUTHSERVICE RESPONSE IS " + response.data);

    return response;
}

export function validateEmail(email) {
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = EMAIL_REGEX.test(email);
    return isEmailValid;
}

export function validatePassword(password) {
    if (password.length < 10) {
        return false;
    }

    return true;
}

export function passwordsMatch(password, confirmPassword) {
    if (password.trim() !== confirmPassword.trim()) {
        return false;
    }
    return true;
}