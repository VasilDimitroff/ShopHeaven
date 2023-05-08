import axios from "../api/axios";
import useAuth from "./useAuth";
import { ApiEndpoints } from "../api/endpoints";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            const response = await axios(ApiEndpoints.auth.logout,
                {
                    widthCredentials: true
                });
        } catch(error) {
            console.log(error);
        }
    }

    return logout;
}

export default useLogout;