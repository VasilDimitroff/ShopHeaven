import { Box, Grid, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import CategoriesList from "./CategoriesList";

export default function CategoriesWrapper(props) {
  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "block",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
        width: "95%",
    },
  });
  return (
    <div>
      <ContentWrapper>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <CategoriesList categories={props.categories} heading={props.heading} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </div>
  );
}
