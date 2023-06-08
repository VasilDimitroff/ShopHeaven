import { React } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";

export default function Loader() {
  return (
    <Stack spacing={1}>
      <Typography variant="p" sx={{ textAlign: "center", paddingBottom: 1 }}>
        Data is loading, please wait...
      </Typography>
      <Skeleton variant="rounded" animation="pulse" height={65} />
      <Skeleton variant="rounded" animation="pulse" height={65} />
      <Skeleton variant="rounded" animation="pulse" height={65} />
      <Skeleton variant="rounded" animation="pulse" height={65} />
      <Skeleton variant="rounded" animation="pulse" height={65} />
      <Skeleton variant="rounded" animation="pulse" height={65} />
    </Stack>
  );

  {
    /*(
 
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

    ); */
  }
}
