import { React } from "react";
import { theme } from "../../theme";
import { CircularProgress, Backdrop, Box } from "@mui/material";

export default function StartLoader() {
  return (
    <Box>
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
    </Box>
  );
}
