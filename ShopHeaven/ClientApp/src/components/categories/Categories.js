import BreadcrumbsBar from "../common/BreadcrumbsBar";
import { React, useState, useRef, useEffect, Fragment } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Tooltip, Zoom } from "@mui/material";
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
  columnsWithCategoriesToShowIfScreenIsLg,
  allCategoriesUrl,
  columnsWithCategoriesToShowIfScreenIsMd,
  subcategoriesOfMainCategoryBaseUrl,
} from "../../constants";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
  {
    name: "Home",
    uri: "/",
  },
  {
    name: "Categories",
    uri: `${allCategoriesUrl}`,
  },
];

let colsToShow = 0;

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // array[{}]

  const effectRun = useRef(false);

  colsToShow =
    useMediaQuery(theme.breakpoints.down("md")) === true
      ? columnsWithCategoriesToShowIfScreenIsMd
      : columnsWithCategoriesToShowIfScreenIsLg;

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

  function navigateTo(uri) {
    navigate(uri);
  }

  return (
    <>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      <MainWrapper sx={{ mt: 5 }}>
        <GalleryHeading>CATEGORIES</GalleryHeading>
        <GalleryImageList cols={colsToShow}>
          {categories?.map((category) => (
            <Fragment key={category.id}>
              <Tooltip
                TransitionComponent={Zoom}
                title={category.description}
                arrow
              >
                <GalleryImageListItem
                  onClick={() =>
                    navigateTo(
                      `${subcategoriesOfMainCategoryBaseUrl}${category.id}`
                    )
                  }
                >
                  <img
                    src={`${category.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${category.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={category.name}
                    loading="lazy"
                  />
                  <GalleryImageListItemBar
                    position="top"
                    title={category.name}
                    subtitle={`${category.subcategoriesCount} subcategories, ${category.productsCount} products`}
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
