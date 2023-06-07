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
} from "../../../constants";

export default function Product() {
  const params = useParams();
  const { auth } = useAuth();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);

  const effectRun = useRef(false);

  useEffect(() => {
    window.scroll(0, 0);
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await axios.post(
          ApiEndpoints.products.getById,
          {
            id: params.productId,
            userId: auth.userId,
            similarProductsCount: similarProductsForSingleProductPageSlider,
          },
          {
            signal: controller.signal,
          }
        );

        console.log(response);
        
        setProduct(response?.data?.product);
        setSimilarProducts(response?.data?.similarProducts);

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
          <ProductMainInfo product={product} />
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
