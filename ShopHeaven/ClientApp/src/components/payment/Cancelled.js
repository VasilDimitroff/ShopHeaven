import { React, useState } from "react";
import { Box, Grid, Paper, Button, Typography } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";


export default function Cancelled() {

    const navigate = useNavigate();

    const ComponentWrapper = styled(Paper)({
        width: "80%",
        display: "block",
        margin: "auto",
        padding: theme.spacing(5,3),
        textAlign: "center",
        textDecoration: "none"
    });

    const GoHomeButton = styled(Button)({
        display: "block",
        margin: "auto",
        marginTop: theme.spacing(3),
    })


    return (
        <Box sx={{pt: 15}}>
        <ComponentWrapper>
          <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", gap: 1}}>
            <HighlightOff sx={{ color:theme.palette.error.main, fontSize: 35 }}/>
            <Typography sx={{color: theme.palette.error.main}} variant="h4">PAYMENT CANCELLED!</Typography>
          </Box>
            <GoHomeButton onClick={() => navigate(-1)} variant="contained">Go back</GoHomeButton>
        </ComponentWrapper>
        </Box>

    )
}
