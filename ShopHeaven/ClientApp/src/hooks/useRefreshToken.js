import axios from "../api/axios";
import useAuth from "./useAuth";
import { ApiEndpoints } from "../api/endpoints";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(ApiEndpoints.auth.refreshToken, {
        withCredentials: false,
    });

    setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(response.data.jwtToken);
        return {...prev, jwtToken: response.data.jwtToken}
    });

    return response.data.jwtToken;
  };

  return refresh;
};

export default useRefreshToken;
