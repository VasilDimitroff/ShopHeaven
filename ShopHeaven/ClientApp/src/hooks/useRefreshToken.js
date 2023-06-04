import axios from "../api/axios";
import useAuth from "./useAuth";
import useUser from "./useUser";
import { ApiEndpoints } from "../api/endpoints";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setUser } = useUser();

  const refresh = async () => {
    const response = await axios.get(ApiEndpoints.auth.refreshToken, {
        withCredentials: true,
    });

    setAuth(prev => {
        console.log(JSON.stringify(prev));
        //console.log("REFRESH TOKEN: " + response.data.refreshToken)
        return {
          ...prev,
          roles: response.data.roles,
          jwtToken: response.data.jwtToken,
          refreshToken: response.data.refreshToken,
          userId: response.data.id,
          email: response.data.email,
          username: response.data.username,
          cartId: response.data.cartId,
          wishlistId: response.data.wishlistId,
          isLogged: response ? true : false,
        }
    });

      setUser(prev => {
        return {
          ...prev,
          wishlistProductsCount: response?.data?.wishlistProductsCount,
          cartProductsCount: response?.data?.cartProductsCount,
        };
      });

      console.log("LOGGED USER", response?.data);

    return response.data.jwtToken;
  };

  return refresh;
};

export default useRefreshToken;
