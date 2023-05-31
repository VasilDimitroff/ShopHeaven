import BreadcrumbsBar from "../common/BreadcrumbsBar";
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
import { columnsWithSubcategoriesToShowIfScreenIsLg, subcategoryProductsBaseUrl, columnsWithSubcategoriesToShowIfScreenIsMd, allCategoriesUrl, subcategoriesOfMainCategoryBaseUrl } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

let colsToShow = 0;

export default function Subcategories() {
  const { categoryId } = useParams();
  const [mainCategory, setMainCategory] = useState({
    id: categoryId,
  });

  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]); // array[{}]

  const effectRun = useRef(false);
  colsToShow =
    useMediaQuery(theme.breakpoints.down("md")) === true
      ? columnsWithSubcategoriesToShowIfScreenIsMd
      : columnsWithSubcategoriesToShowIfScreenIsLg;

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: "Categories",
      uri: `${allCategoriesUrl}`,
    },
    {
      name: `${mainCategory.name}`,
      uri: `${subcategoriesOfMainCategoryBaseUrl}${mainCategory.id}`,
    },
  ];

  useEffect(() => {
    const controller = new AbortController();

    const getSubcategories = async () => {
      try {
        const response = await axios.post(
          ApiEndpoints.subcategories.byCategoryId,
          { categoryId: categoryId },
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setSubcategories(response?.data?.subcategories);

        setMainCategory((prev) => ({
          ...prev,
          id: response?.data?.category.id,
          name: response?.data?.category.name,
          productsCount: response?.data?.productsCount,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getSubcategories();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, []);

  const ContentWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    display: "block",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

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
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  });

  const Heading = styled(Typography)({
    display: "flex",
    justifyContent: "center",
    textTransform: "uppercase",
    fontSize: 30,
    textAlign: "center",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-2),
  });

  const TotalProductsCountText = styled(Typography)({
    display: "flex",
    justifyContent: "center"
  })

  return (
    <>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <ContentWrapper>
        <Heading>{mainCategory.name} - SUBCATEGORIES</Heading>
        <Heading>ID OF {mainCategory.id}</Heading>
        <TotalProductsCountText>{mainCategory.productsCount} products</TotalProductsCountText>
        <StyledImageList cols={colsToShow}>
          {subcategories?.map((subcategory) => (
            <Fragment key={subcategory.id}>
              <Tooltip
                TransitionComponent={Zoom}
                title={subcategory.description}
                arrow
              >
                <StyledImageListItem onClick={() => navigate(`${subcategoryProductsBaseUrl}${subcategory.id}`)}>
                  <img
                    src={`${subcategory.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${subcategory.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={subcategory.name}
                    loading="lazy"
                  />
                  <Fade in={true} direction="up" timeout={900}>
                      <StyledImageListItemBar
                        position="top"
                        title={subcategory.name}
                        subtitle={`${subcategory.productsCount} products`}
                      />
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