import { React, Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { Box, Grid, Paper, Typography, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { loginPath } from "../../../constants";
import { theme } from "../../../theme";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";

export default function AdminSettings() {
  const [currencies, setCurrencies] = useState([{}]);
  const [appCurrencyId, setAppCurrencyId] = useState("");

  const [currencyResponseMessage, setCurrencyResponseMessage] = useState("")

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
        console.log(response.data);

        setCurrencies(response.data);
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

  const HeadingChip = styled(Chip)({
    fontSize: 21,
    padding: theme.spacing(2),
    fontWeight: 500,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.secondary.main,
  });

  const StyledSelect = {
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    backgroundColor: "rgb(255,249,249)",
    marginTop: theme.spacing(1),
    display: "flex",
    margin: "auto",
  };

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  return (
    <Box>
      <Paper>
        <Divider>
          <HeadingChip
            label="PRODUCTS CURRENCY"
            variant="outlined"
            color="secondary"
          />
        </Divider>
        <Box>
          <InputBox>
            <select
              style={StyledSelect}
              ref={appCurrencyRef}
              name="currency"
              defaultValue={appCurrencyId}
            >
              {currencies?.map((currency) => (
                <option key={currency?.id} value={currency?.id}>
                  {`${currency?.name} (${currency?.code})`}
                </option>
              ))}
            </select>
          </InputBox>
        </Box>
      </Paper>
    </Box>
  );
}
