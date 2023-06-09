import BreadcrumbsBar from "../common/BreadcrumbsBar";
import { React, useState, useRef, useEffect, Fragment } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography, Chip, Tooltip, Zoom,} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  MainWrapper,
  GalleryHeading,
  GalleryImageList,
  GalleryImageListItem,
  GalleryImageListItemBar,
} from "../../styles/styles";
import axios from "../../api/axios";
import { ApiEndpoints } from "../../api/endpoints";
import {
  columnsWithSubcategoriesToShowIfScreenIsLg,
  subcategoryProductsBaseUrl,
  columnsWithSubcategoriesToShowIfScreenIsMd,
  allCategoriesUrl,
  subcategoriesOfMainCategoryBaseUrl,
} from "../../constants";
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
          description: response?.data?.category.description,
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

  const TotalProductsCountText = styled(Typography)({
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  });

  return (
    <>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper sx={{ mt: 5 }}>
        <GalleryHeading>{mainCategory.name}</GalleryHeading>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1, mt: -1 }}>
          <Chip
            size="small"
            variant="outlined"
            color="secondary"
            label={`${mainCategory.productsCount} products`}
          />
        </Box>
        <TotalProductsCountText>
          {mainCategory.description}
        </TotalProductsCountText>
        <GalleryImageList cols={colsToShow}>
          {subcategories?.map((subcategory) => (
            <Fragment key={subcategory.id}>
              <Tooltip
                TransitionComponent={Zoom}
                title={subcategory.description}
                arrow
              >
                <GalleryImageListItem
                  onClick={() =>
                    navigate(`${subcategoryProductsBaseUrl}${subcategory.id}`)
                  }
                >
                  <img
                    src={`${subcategory.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${subcategory.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={subcategory.name}
                    loading="lazy"
                  />
                  <GalleryImageListItemBar
                    position="top"
                    title={subcategory.name}
                    subtitle={`${subcategory.productsCount} products`}
                  />
                </GalleryImageListItem>
              </Tooltip>
            </Fragment>
          ))}
        </GalleryImageList>
      </MainWrapper>
    </>
  );
}
