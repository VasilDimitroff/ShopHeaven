import BreadcrumbsBar from "../BreadcrumbsBar";
import { React, useState, useRef, useEffect, Fragment } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  ImageList,
  Typography,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Zoom,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import axios from "../../api/axios";
import { ApiEndpoints } from "../../api/endpoints";
import { Link } from "react-router-dom";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: "Categories",
    uri: "/categories",
  },
];

let colsToShow = 0;

export default function Categories() {
  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "block",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

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
    textTransform: "uppercase",
    "&:hover": {
      outlineColor: theme.palette.primary.main,
      outlineStyle: "solid",
      outlineWidth: "3px",
      boxShadow: theme.palette.dropdown.boxShadow.main,
      opacity: "0.9",
    },
  });

  const StyledImageListItemBar = styled(ImageListItemBar)({
    fontWeight: 500,
    background:
    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  });

  const Heading = styled(Typography)({
    display: "flex",
    justifyContent: "center",
    fontSize: 35,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
  });

  return (
    <>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <ContentWrapper>
          <Heading>CATEGORIES</Heading>
          <StyledImageList cols={colsToShow}>
            {categories?.map((category) => (
              <Fragment key={category.id}>
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
                          position="top"
                          title={category.name}
                          subtitle={`${category.subcategoriesCount} subcategories, ${category.productsCount} products`}
                        />
                      </Link>
                    </Fade>
                  </StyledImageListItem>
                </Tooltip>
              </Fragment>
            ))}
          </StyledImageList>
      </ContentWrapper>
    </>
  );
}