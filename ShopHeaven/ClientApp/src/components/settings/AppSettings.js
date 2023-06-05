import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import StartLoader from '../common/StartLoader';
import useAppSettings from '../../hooks/useAppSettings';
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
          <StartLoader/>
        ) : (
          <Outlet />
        )}
      </>
    );
}

export default AppSettings;