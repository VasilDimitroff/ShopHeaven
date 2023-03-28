import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  Link,
} from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "./../../theme";
import Sidebar from "./Sidebar";
import AllCategories from "./AllCategories";

export default function SidebarWithProducts(props) {
  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "block",
    border: "2px solid blue",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
        width: "95%",
    },
  });
  return (
    <div>
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9}
          >
            <AllCategories />
          </Grid>
        </Grid>
      </ContentWrapper>
    </div>
  );
}
