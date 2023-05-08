import { Outlet } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { theme } from "../../theme";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
        <Fragment>
          <Backdrop
            open={true}
            sx={{backgroundColor:theme.palette.primary.main, color: theme.palette.white.main, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Fragment>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
