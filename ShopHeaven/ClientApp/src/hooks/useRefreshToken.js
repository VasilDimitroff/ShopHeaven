import axios from "../api/axios";
import useAuth from "./useAuth";
import { ApiEndpoints } from "../api/endpoints";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(ApiEndpoints.auth.refreshToken, {
        withCredentials: true,
    });

    setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log("REFRESH TOKEN: " + response.data.refreshToken)
        return {
          ...prev,
          roles: response.data.roles,
          jwtToken: response.data.jwtToken,
          refreshToken: response.data.refreshToken}
    });

    return response.data.jwtToken;
  };

  return refresh;
};

export default useRefreshToken;
