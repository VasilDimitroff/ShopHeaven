import { React } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { theme } from "../../theme";

export default function Loader() {
  return (
    <Box>
      <CircularProgress
        sx={{ display: "block", width: "100%", margin: "auto" }}
      />
      <Typography
        sx={{
          display: "block",
          textAlign: "center",
          marginTop: theme.spacing(2),
        }}
        variant="p"
      >
        Data is loading, please wait...
      </Typography>
    </Box>
  );
}
