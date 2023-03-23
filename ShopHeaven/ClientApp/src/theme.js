import { createTheme } from '@mui/material';

export const theme  = createTheme({
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
            main: "#fff",         
            //main: "#dde7f5",
            color: "#000",
            boxShadow: "1px 4px 6px 4px rgba(0,0,0,0.42)",     
        },
        appBackground: {
            main: "#f2f2f7",
        },
        onHoverButtonColor: {
            main: "#d7edfd",
        },        
    },
    shape: {
        borderRadius: "7px",
    },
});