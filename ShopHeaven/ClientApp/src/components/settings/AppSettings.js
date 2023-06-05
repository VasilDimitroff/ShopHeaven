import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import useAppSettings from '../../hooks/useAppSettings';
import Backdrop from "@mui/material/Backdrop";
import { theme } from "../../theme";
import { ApiEndpoints } from '../../api/endpoints';
import axios from '../../api/axios';

const AppSettings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {appSettings, setAppSettings } = useAppSettings();

    const isRan = useRef(false);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get(ApiEndpoints.currencies.getAppCurrency);

        setAppSettings(prev => {
            return {
                ...prev,
                appCurrency: {
                    id: response?.data?.id,
                    code: response?.data?.code,
                    name: response?.data?.name,
                    isCurrentForApplication: response?.data?.isCurrentForApplication
                }
            }
          });

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isRan.current) {
        !appSettings?.appCurrency ? getCurrencies() : setIsLoading(false);
    }
    return () => {
      isRan.current = true;
    };
  }, []);
  
    return ( 
        <>
        {isLoading ? (
          <>
            <Backdrop
              open={true}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.white.main,
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        ) : (
          <Outlet />
        )}
      </>
    );
}

export default AppSettings;