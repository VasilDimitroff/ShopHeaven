import { React, useState, useEffect, useRef } from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import { TaskAlt, HighlightOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import { cartPath } from "../../constants";

export default function Success() {
    const axiosPrivate = useAxiosPrivate();
    const [paymentSession, setPaymentSession] = useState({ id: localStorage.getItem("paymentSessionId") || "" });
    const navigate = useNavigate();
    const effectRun = useRef(false);

    useEffect(() => {
        const controller = new AbortController();

        const getPaymentSession = async () => {
            try {
                const response = await axiosPrivate.post(
                    ApiEndpoints.payments.getPaymentSession,
                    { id: paymentSession.id },
                    {
                        signal: controller.signal,
                    }
                );

                setPaymentSession(response?.data);

                console.log(response?.data)
            } catch (error) {
                console.log(error);
            }
        };

        if (effectRun.current) {
            getPaymentSession();
        }

        return () => {
            controller.abort();
            effectRun.current = true; // update the value of effectRun to true
        };
    }, []);


    const ComponentWrapper = styled(Paper)({
        width: "80%",
        display: "block",
        margin: "auto",
        padding: theme.spacing(5, 3),
        textAlign: "center",
        textDecoration: "none"
    });

    const GoHomeButton = styled(Button)({
        display: "block",
        margin: "auto",
        marginTop: theme.spacing(3),
    })


    return (
        <Box sx={{ pt: 15 }}>
            <ComponentWrapper>
                {
                    paymentSession?.isSuccessful
                        ? (<Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                <TaskAlt sx={{ color: theme.palette.success.main, fontSize: 35 }} />
                                <Typography sx={{ color: theme.palette.success.main }} variant="h4">PAYMENT COMPLETED!</Typography>
                            </Box>
                            <br />
                            <Typography variant="p">Thank you!</Typography>
                        </Box>)
                        : (<Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                <HighlightOff sx={{ color: theme.palette.error.main, fontSize: 35 }} />
                                <Typography sx={{ color: theme.palette.error.main }} variant="h4">PAYMENT FAILED!</Typography>
                            </Box>
                            <br />
                            <Typography variant="p">Sorry!</Typography>
                        </Box>)
                }
                <GoHomeButton onClick={() => navigate(cartPath)} variant="contained">Go to cart</GoHomeButton>
            </ComponentWrapper>
        </Box>

    )
}
