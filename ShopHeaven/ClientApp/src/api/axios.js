import axios from "axios";
import { apiUrl } from "./endpoints";

export default axios.create({
    baseURL: apiUrl
});

export const axiosPrivate = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type' : 'application/json' },
    withCredentials: true,
});