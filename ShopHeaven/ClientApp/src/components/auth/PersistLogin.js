import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import StartLoader from "../common/StartLoader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const isRan = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isRan.current) {
      !auth?.jwtToken ? verifyRefreshToken() : setIsLoading(false);
    }
    return () => {
      isRan.current = true;
    };
  }, []);

  useEffect(() => {
    console.log("is loading " + isLoading);
    console.log("jwt " + auth?.jwtToken);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <StartLoader/>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
