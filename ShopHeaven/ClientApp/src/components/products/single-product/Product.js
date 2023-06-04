import { React, useState, useRef, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";
import BreadcrumbsBar from "../../common/BreadcrumbsBar";
import ProductMainInfo from "./ProductMainInfo";
import ProductsCarousel from "../products-carousel/ProductsCarousel";
import ProductDetailInfo from "./ProductDetailInfo";
import CircleLoader from "../../common/CircleLoader";
import { ApiEndpoints } from "../../../api/endpoints";
import axios from "../../../api/axios";
import {
  singleProductBasePath,
  subcategoryProductsBaseUrl,
  subcategoriesOfMainCategoryBaseUrl,
  similarProductsForSingleProductPageSlider,
  reviewsPerPageInProductPage
} from "../../../constants";

export default function Product() {
  const params = useParams();
  const effectRun = useRef(false);
  const { auth } = useAuth();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);

    //current page with reviews - pagination states
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [totalReviewsCount, setTotalReviewsCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await axios.post(
          ApiEndpoints.products.getById,
          {
            id: params.productId,
            userId: auth.userId,
            similarProductsCount: similarProductsForSingleProductPageSlider,
            recordsPerPage: reviewsPerPageInProductPage,
            page: page,
            searchTerm: "",
          },
          {
            signal: controller.signal,
          }
        );

        console.log(response?.data);
        
        setProduct(response?.data?.product);
        setSimilarProducts(response?.data?.similarProducts);
        setNumberOfPages(response?.data?.pagesCount);
        setTotalReviewsCount(response?.data?.reviewsCount);

        if (page > response?.data?.pagesCount) {
          setPage(1);
        }

      } catch (error) {
        console.log(error);
      }
    };

    if (effectRun.current) {
      getProduct();
    }

    return () => {
      effectRun.current = true; // update the value of effectRun to true
      controller.abort();
    };
  }, [params]);

  const breadcrumbs = [
    {
      name: "Home",
      uri: "/",
    },
    {
      name: `${product?.category?.name ?? ""}`,
      uri: `${subcategoriesOfMainCategoryBaseUrl}${product?.category?.id}`,
    },
    {
      name: `${product?.subcategory?.name ?? ""}`,
      uri: `${subcategoryProductsBaseUrl}${product?.subcategory?.id}`,
    },
    {
      name: `${
        product?.name.length > 25
          ? product?.name.slice(0, 25) + "..."
          : product?.name ?? ""
      }`,
      uri: `${singleProductBasePath}${params}`,
    },
  ];

  return (
    <Fragment>
      <BreadcrumbsBar breadcrumbsItems={breadcrumbs} />
      {product ? (
        <>
          <ProductMainInfo product={product} totalReviewsCount={totalReviewsCount} />
          <ProductsCarousel
            products={similarProducts}
            headingName="Similar Products"
          />
          <ProductDetailInfo product={product}/>
        </>
      ) : (
        <CircleLoader />
      )}
    </Fragment>
  );
}
