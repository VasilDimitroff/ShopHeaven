import { Breadcrumbs, Chip, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../theme";
import { Link } from "react-router-dom";

export default function BreadcrumbsBar(props) {
  const StyledChip = styled(Chip)({
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.white.main,
    },
  });

  const BreadcrumbsWrapper = styled(Box)({
    paddingTop: theme.spacing(11),
    width: "80%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  });

  return (
    <BreadcrumbsWrapper>
    <Breadcrumbs aria-label="breadcrumb">
      {props.breadcrumbsItems.map((breadcrumb, index) =>
        index < props.breadcrumbsItems.length - 1 ? (
          <Link
            style={{ textDecoration: "none" }}
            key={index}
            to={`${breadcrumb.uri}`}
          >
            <StyledChip color="primary" label={breadcrumb.name} />
          </Link>
        ) : (
          <Chip color="primary" key={index} label={breadcrumb.name} />
        )
      )}
    </Breadcrumbs>
    </BreadcrumbsWrapper>
  );
}
