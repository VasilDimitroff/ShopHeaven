import { React } from "react";
import {
  Box,
  ImageList,
  Typography,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Tooltip,
  Zoom,
  Fade
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

let colsToShow = 0;

export default function CategoriesList(props) {
  colsToShow = useMediaQuery(theme.breakpoints.down("md")) === true ? 2 : 4;

  const StyledImageList = styled(ImageList)({
    padding: theme.spacing(0.5),
  });

  const StyledImageListItem = styled(ImageListItem)({
    cursor: "pointer",
    "&:hover": {
      outlineColor: theme.palette.primary.main,
      outlineStyle: "solid",
      outlineWidth: "3px",
      boxShadow: theme.palette.dropdown.boxShadow.main,
      opacity: "0.9",
    },
  });

  const GridHolder = styled(Box)({});

  const StyledImageListItemBar = styled(ImageListItemBar)({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: "500",
  });

  const Heading = styled(Typography)({
    display: "flex",
    justifyContent: "center",
    fontSize: 35,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
  })

  return (
    <GridHolder>
      <Heading>{props.heading}</Heading>
      <StyledImageList cols={colsToShow}>
        {props.categories.map((item) => (
          <Zoom in={true}>
          <StyledImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <Fade in={true} direction="up" timeout={900}>
            <Link to="/">
              <StyledImageListItemBar
                title={item.name}
                subtitle={ item.subcategories !== null ? `${item.subcategories.length} subcategories` : ""}
                actionIcon={
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={item.description}
                    arrow
                  >
                    <IconButton
                      sx={{ color: theme.palette.white.main, opacity: "0.67" }}
                      aria-label={`info about ${item.name}`}
                    >
                      <Info />
                    </IconButton>
                  </Tooltip>
                }
              />
            </Link>
            </Fade>
          </StyledImageListItem>
          </Zoom>
        ))}
      </StyledImageList>
    </GridHolder>
  );
}
