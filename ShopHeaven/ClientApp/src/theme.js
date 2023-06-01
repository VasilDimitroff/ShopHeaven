import { createTheme } from '@mui/material';

export const theme  = createTheme({
    typography: {
        fontFamily: "Segoe UI",
        fontWeightRegular: 400,
        fontSize: 14
      },
    palette: {
        mode: 'light',
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
            main: "#fff",         
            color: "#000",
            boxShadow: "1px 4px 6px 4px rgba(0,0,0,0.42)",     
        },
        background: {
            default: "#f2f2f7",
        },
        white: {
            main: "#ffffff",
        },
    },
    shape: {
        borderRadius: "7px",
    },
});