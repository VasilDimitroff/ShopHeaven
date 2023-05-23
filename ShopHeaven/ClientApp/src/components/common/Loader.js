import { React, Fragment } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { theme } from "../../theme";

export default function Loader() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
