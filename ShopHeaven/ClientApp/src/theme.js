import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#4083e2",
        },
        secondary: {
            main: "#e6412f",
        },
        success: {
            main: "#388e3c",
        },
        error: {
            main: "#f44336",
        },
        dropdown: {
            main: "#dde7f5",
            color: "#fff",
        }  
    },
    shape: {
        borderRadius: "7px",
    },
});