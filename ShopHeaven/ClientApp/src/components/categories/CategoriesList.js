import { React, useState, useRef, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  ImageList,
  Typography,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import axios from "../../api/axios";
import { ApiEndpoints } from "../../api/endpoints";
import { Link } from "react-router-dom";

let colsToShow = 0;

export default function CategoriesList(props) {
  const [categories, setCategories] = useState([]); // array[{}]

  const effectRun = useRef(false);

  colsToShow = useMediaQuery(theme.breakpoints.down("md")) === true ? 2 : 4;

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axios.get(
          ApiEndpoints.categories.getCategoriesSummary,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setCategories(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getCategories();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

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
  });

  return (
    <GridHolder>
      <Heading>{props.heading}</Heading>
      <StyledImageList cols={colsToShow}>
        {categories?.map((category) => (
          <Zoom in={true} key={category.id}>
            <Tooltip
              TransitionComponent={Zoom}
              title={category.description}
              arrow
            >
              <StyledImageListItem>
                <img
                  src={`${category.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${category.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={category.name}
                  loading="lazy"
                />
                <Fade in={true} direction="up" timeout={900}>
                  <Link to="/">
                    <StyledImageListItemBar
                      title={category.name}
                      subtitle={`${category.subcategoriesCount} subcategories, ${category.productsCount} products`}
                      actionIcon={
                        <IconButton
                          sx={{
                            color: theme.palette.white.main,
                            opacity: "0.67",
                          }}
                          aria-label={`info about ${category.name}`}
                        >
                          <Info />
                        </IconButton>
                      }
                    />
                  </Link>
                </Fade>
              </StyledImageListItem>
            </Tooltip>
          </Zoom>
        ))}
      </StyledImageList>
    </GridHolder>
  );
}