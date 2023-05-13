import { Breadcrumbs, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../theme";
import { Link } from "react-router-dom";

export default function BreadcrumbsBar(props) {
  const BreadcrumbsWrapper = styled(Box)({
    paddingTop: theme.spacing(11.8),
    width: "80%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  });

  const CustomBreadcrumbs = styled(Breadcrumbs)({
    display: "flex",
    justifyContent: "center",
  });

  return (
    <BreadcrumbsWrapper>
      <CustomBreadcrumbs separator="›" aria-label="breadcrumb">
        {props.breadcrumbsItems.map((breadcrumb, index) =>
          index < props.breadcrumbsItems.length - 1 ? (
            <Link
              style={{ textDecoration: "none" }}
              key={index}
              to={`${breadcrumb.uri}`}
            >
              <Typography>{breadcrumb.name}</Typography>
            </Link>
          ) : (
            <Typography key={index}>{breadcrumb.name}</Typography>
          )
        )}
      </CustomBreadcrumbs>
    </BreadcrumbsWrapper>
  );
}
