import { axiosPrivateForm } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivateForm = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivateForm.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.jwtToken}`;
                }
                console.log("IN REQUEST JWT IS: " + auth?.jwtToken);
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivateForm.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log("NEW TOKEN AFTER RESPONSE: " + newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivateForm(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivateForm.interceptors.request.eject(requestIntercept);
            axiosPrivateForm.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivateForm;
}

export default useAxiosPrivateForm;