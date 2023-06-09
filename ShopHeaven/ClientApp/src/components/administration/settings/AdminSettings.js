import { React, Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Paper, Zoom, Divider, Chip, Alert, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  loginPath,
  noPermissionsForOperationMessage,
} from "../../../constants";
import { theme } from "../../../theme";
import { InputBox, HeadingChip } from "../../../styles/styles";
import useAppSettings from "../../../hooks/useAppSettings";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";

export default function AdminSettings() {
  const { setAppSettings, appSettings } = useAppSettings();

  const [currencies, setCurrencies] = useState([]);
  const [appCurrencyId, setAppCurrencyId] = useState();

  const [currencyResponseMessage, setCurrencyResponseMessage] = useState("");
  const [currencyErrorMessage, setCurrencyErrorMessage] = useState("");

  let axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const effectRun = useRef(false);

  const appCurrencyRef = useRef();

  useEffect(() => {
    const controller = new AbortController();

    const getCurrencies = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          ApiEndpoints.currencies.getAll,
          {
            signal: controller.signal,
          }
        );

        setCurrencies(response?.data);

        const currentAppCurrencyId = response?.data?.find(
          (x) => x.isCurrentForApplication == true
        ).id;
        setAppCurrencyId(currentAppCurrencyId);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate({ loginPath }, { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getCurrencies();
    }

    return () => {
      controller.abort();
      effectRun.current = true; // update the value of effectRun to true
    };
  }, []);

  function onChangeAppCurrency(e) {
    e.preventDefault();

    const requestData = {
      id: appCurrencyRef.current.value,
    };

    setDefaultAppCurrency(requestData);
  }

  async function setDefaultAppCurrency(requestData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.currencies.setAppCurrency,
        requestData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      let newCurrency = response?.data;
      setAppCurrencyId(newCurrency.id);

      setCurrencyErrorMessage("");
      setCurrencyResponseMessage(
        `The new currency for the application is ${newCurrency.name} (${newCurrency.code})`
      );

      setAppSettings(prev => {
        return {
          ...prev,
          appCurrency: {
            id: newCurrency.id,
            code: newCurrency.code,
            name: newCurrency.name,
            isCurrentForApplication: newCurrency.isCurrentForApplication
          }
        }
      })

      console.log("RESPONSE: ", response?.data);
    } catch (error) {
      setCurrencyResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCurrencyErrorMessage(noPermissionsForOperationMessage);
      } else {
        setCurrencyErrorMessage(error?.response?.data);
      }
      console.log(error);
    }
  }

  function clearResponseMessage() {
    setCurrencyResponseMessage("");
  }

  function clearErrorMessage() {
    setCurrencyErrorMessage("");
  }

  const StyledSelect = {
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2.18, 1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    marginTop: theme.spacing(1),
    display: "flex",
    margin: "auto",
  };

  const ChangeCurrencyButtonHolder = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  });

  return (
    <Box>
      <Paper sx={{ p: 1 }}>
        <Divider>
          <HeadingChip
            label="PRODUCTS CURRENCY"
            variant="outlined"
            color="secondary"
          />
        </Divider>
        <Box>
          <Typography sx={{textAlign: "center", mb: 3}}>Now current currency of the application is {appSettings.appCurrency.name} ({appSettings.appCurrency.code})</Typography>
          <InputBox>
            <form onSubmit={onChangeAppCurrency}>
              <select
                style={StyledSelect}
                ref={appCurrencyRef}
                name="currency"
                value={appCurrencyId}
              >
                {currencies?.map((currency) => (
                  <option key={currency?.id} value={currency?.id}>
                    {`${currency?.name} (${currency?.code})`}
                  </option>
                ))}
              </select>
              <ChangeCurrencyButtonHolder>
                <Button type="submit" variant="contained">
                  CHANGE APP CURRENCY
                </Button>
              </ChangeCurrencyButtonHolder>
            </form>
            {currencyErrorMessage ? (
              <Zoom in={currencyErrorMessage.length > 0 ? true : false}>
                <Alert onClose={clearErrorMessage} variant="filled" severity="error">
                  {currencyErrorMessage}
                </Alert>
              </Zoom>
            ) : (
              <></>
            )}
            {currencyResponseMessage ? (
              <Zoom in={currencyResponseMessage.length > 0 ? true : false}>
                <Alert onClose={clearResponseMessage} severity="success">
                  {currencyResponseMessage}
                </Alert>
              </Zoom>
            ) : (
              <></>
            )}
          </InputBox>
        </Box>
      </Paper>
    </Box>
  );
}
