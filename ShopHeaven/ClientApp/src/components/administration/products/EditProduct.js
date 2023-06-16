import { React, useState, useRef, useEffect } from "react";
import {
  SaveTagsButton,
  StyledSelect,
  HeadingChip,
  SubheadingChip,
  UniversalInput,
  InputBox,
  AddSpecificationButton,
  CalculatePriceButton,
  StyledChip,
  TagsWrapper,
  CompleteActionButton,
  TagWord,
  AdminMainWrapper
} from "../../../styles/styles";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Collapse,
  Grid,
  Divider,
  Alert,
  Zoom,
  Tooltip,
  TextField,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AddCircle,
  RemoveCircle,
  Edit,
  Photo,
  Cancel,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAppSettings from "../../../hooks/useAppSettings";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  noPermissionsForOperationMessage,
  allowedFileFormats,
} from "../../../constants";
import useAuth from "../../../hooks/useAuth";

export default function EditProduct(props) {
  // api requests
  const axiosPrivateForm = useAxiosPrivateForm();
  const axiosPrivate = useAxiosPrivate();

  //app settings
  const { appSettings } = useAppSettings();

  //auth
  const { auth } = useAuth();

  const [product, setProduct] = useState(props.product);

  //dropdowns
  const [categories, setCategories] = useState(props.categories);
  const [subcategories, setSubcategories] = useState([]);

  //form states
  const [productName, setProductName] = useState(product.name);
  const [productBrand, setProductBrand] = useState(product.brand);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productCategoryId, setProductCategoryId] = useState(
    product.categoryId
  );
  const [productSubcategoryId, setProductSubcategoryId] = useState(
    product.subcategoryid
  );
  const [productHasGuarantee, setProductHasGuarantee] = useState(
    product.hasGuarantee
  );
  const [productSpecifications, setProductSpecifications] = useState(
    product.specifications
  ); //array[object]

  const [productPrice, setProductPrice] = useState(product.price);
  const [productDiscount, setProductDiscount] = useState(product.discount);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productImages, setProductImages] = useState(product.images); // array[{}]
  const [productTags, setProductTags] = useState(product.tags); // array[string]
  const [productLabels, setProductLabels] = useState(product.labels); // array[string]
  const [finalPrice, setFinalPrice] = useState(productPrice - productPrice * (productDiscount / 100));

  const [tagsInput, setTagsInput] = useState(true);
  const [labelsInput, setLabelsInput] = useState(true);

  //product editing refs
  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productBrandRef = useRef();
  let productCategoryRef = useRef();
  let productSubcategoryRef = useRef();
  let productGuaranteeRef = useRef();
  let productQuantityRef = useRef();
  let productPriceRef = useRef();
  let productDiscountRef = useRef();
  let productTagsRef = useRef();
  let productLabelsRef = useRef();
  let productSpecificationKeyRef = useRef();
  let productSpecificationValueRef = useRef();

  //errors
  const [messages, setMessages] = useState({
    productNameError: "",
    productDescriptionError: "",
    productCategoryError: "",
    productSubcategoryError: "",
    productPriceError: "",
    productDiscountError: "",
    productQuantityError: "",
    productGuaranteeError: "",
    productTagsError: "",
  });

  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState("");

  const [
    deleteProductImageResponseMessage,
    setDeleteProductImageResponseMessage,
  ] = useState("");
  const [deleteProductImageErrorMessage, setDeleteProductImageErrorMessage] =
    useState("");

  const [thumbnailResponseMessage, setThumbnailResponseMessage] = useState("");
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useState("");

  useEffect(() => { }, [messages]);
  useEffect(() => { }, [productImages]);

  useEffect(() => {
    loadSubcategories();
    setProductSubcategoryId(product.subcategoryId);
  }, []);

  function handleTagsInput() {
    //1
    setValuesToStates();
    setTagsInput((prev) => !prev);
  }

  function handleLabelsInput() {
    //2
    setValuesToStates();
    setLabelsInput((prev) => !prev);
  }

  function loadSubcategories() {
    const checkedCategoryId = productCategoryRef.current.value;

    const subcats = categories.find(
      (x) => x.id === checkedCategoryId
    )?.subcategories;
    setSubcategories(subcats);
    //3
    setValuesToStates();
  }

  function calculateFinalPrice() {
    setValuesToStates();
  }

  function setValuesToStates() {
    setProductName(productNameRef.current.value);
    setProductBrand(productBrandRef.current.value);
    setProductDescription(productDescriptionRef.current.value);
    setProductCategoryId(productCategoryRef.current.value);
    setProductSubcategoryId(productSubcategoryRef.current.value);
    setProductPrice(productPriceRef.current.value);
    setProductDiscount(productDiscountRef.current.value);
    setProductQuantity(productQuantityRef.current.value);

    let currPrice = parseFloat(productPriceRef.current.value);
    let currDiscount = parseFloat(productDiscountRef.current.value);
    let newFinalPrice = currPrice - currPrice * (currDiscount / 100);
    setFinalPrice(newFinalPrice);
    console.log("TAOTAl PRICE", newFinalPrice)

    const checkedHasGuarantee = productGuaranteeRef.current.value === "true";
    setProductHasGuarantee(checkedHasGuarantee);

    const key = productSpecificationKeyRef.current.value;
    const value = productSpecificationValueRef.current.value;

    if (key.length > 0 && value.length > 0) {
      setProductSpecifications((prev) => [...prev, { key: key, value: value }]);
    }

    let tags = productTagsRef.current.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setProductTags(tags);

    let labels = productLabelsRef.current.value
      .split(",")
      .map((label) => label.trim())
      .filter((label) => label.length > 0);

    setProductLabels(labels);
  }

  function onEditProduct(e) {
    e.preventDefault();

    //4
    setValuesToStates();

    let isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const images = document.getElementById("edit-product-photos-image").files;
    const imagesAsArray = [...images];

    const newProduct = {
      name: productNameRef.current.value,
      brand: productBrandRef.current.value,
      description: productDescriptionRef.current.value,
      categoryId: productCategoryRef.current.value,
      subcategoryId: productSubcategoryRef.current.value,
      hasGuarantee: productGuaranteeRef.current.value,
      price: productPriceRef.current.value,
      discount: productDiscountRef.current.value,
      quantity: productQuantityRef.current.value,
      images: imagesAsArray,
      specifications: productSpecifications,
      tags: productTagsRef.current.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      labels: productLabelsRef.current.value
        .split(",")
        .map((label) => label.trim())
        .filter((label) => label.length > 0),
    };

    const formData = new FormData();

    formData.append("id", product.id);
    formData.append("name", newProduct.name);
    formData.append("brand", newProduct.brand);
    formData.append("description", newProduct.description);
    formData.append("categoryId", newProduct.categoryId);
    formData.append("subcategoryId", newProduct.subcategoryId);
    formData.append("hasGuarantee", newProduct.hasGuarantee);
    formData.append("price", newProduct.price);
    formData.append("discount", newProduct.discount);
    formData.append("quantity", newProduct.quantity);

    newProduct.images.forEach((file) => {
      formData.append(`images`, file);
    });

    newProduct.specifications.forEach((spec, index) => {
      Object.keys(spec).forEach((key) => {
        formData.append(`specifications[${index}].${key}`, spec[key]);
      });
    });

    newProduct.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    newProduct.labels.forEach((label, index) => {
      formData.append(`labels[${index}]`, label);
    });

    formData.append("createdBy", auth.userId);

    console.log("FORM", newProduct);
    editProduct(formData);
  }

  function handleUpdateProduct(product) {
    setProductImages(product.images);
  }

  async function editProduct(formData) {
    console.log("EDIT PRODUCT REQUES", formData);
    try {
      const controller = new AbortController();

      const response = await axiosPrivateForm.post(
        ApiEndpoints.products.editProduct,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      setThumbnailErrorMessage("");
      setThumbnailResponseMessage("");
      setDeleteProductImageErrorMessage("");
      setDeleteProductImageResponseMessage("");
      setEditProductErrorMessage("");
      setEditProductResponseMessage(
        `${formData.get("name")} successfully updated`
      );

      handleUpdateProduct(response?.data);

      window.scroll(0, 0);

      props.updateProduct(response?.data);
    } catch (error) {
      setEditProductResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setEditProductErrorMessage(noPermissionsForOperationMessage);
      } else {
        setEditProductErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    }
  }

  function onSetThumbnail(imageUrl) {
    //5
    setValuesToStates();

    setDeleteProductImageErrorMessage("");
    setDeleteProductImageResponseMessage("");

    setThumbnail(imageUrl, product.id);
  }

  async function setThumbnail(imageUrl, productId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.images.setThumbnail,
        JSON.stringify({ productId: productId, imageUrl: imageUrl }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      handleSetThumbnail(imageUrl, true);

      setThumbnailErrorMessage("");
      setThumbnailResponseMessage("Image successfully set as thumbnail!");
      console.log(response?.data);
    } catch (error) {
      setThumbnailResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setThumbnailErrorMessage(noPermissionsForOperationMessage);
      } else {
        setThumbnailErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  function handleSetThumbnail(imageUrl, isThumbnail) {
    const updatedImages = productImages.map((img) => {
      if (img.url === imageUrl) {
        return { ...img, isThumbnail: isThumbnail };
      } else {
        return { ...img, isThumbnail: !isThumbnail };
      }
    });

    setProductImages(updatedImages);
  }

  function onDeleteImage(imageUrl) {
    //6
    setValuesToStates();

    setThumbnailResponseMessage("");
    setThumbnailErrorMessage("");

    if (productImages.length < 2) {
      setDeleteProductImageResponseMessage("");
      setDeleteProductImageErrorMessage(
        "Product must contain at least 1 image"
      );
      return;
    } else {
      setDeleteProductImageErrorMessage("");
    }

    deleteImage(imageUrl, product.id);
  }

  async function deleteImage(imageUrl, productId) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivate.post(
        ApiEndpoints.images.deleteProductImage,
        JSON.stringify({ productId: productId, imageUrl: imageUrl }),
        {
          signal: controller.signal,
        }
      );

      controller.abort();

      handleDeleteImage(imageUrl);

      setDeleteProductImageErrorMessage("");
      setDeleteProductImageResponseMessage("Image successfully deleted!");
    } catch (error) {
      setDeleteProductImageResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setDeleteProductImageErrorMessage(noPermissionsForOperationMessage);
      } else {
        setDeleteProductImageErrorMessage(error?.response?.data);
      }
      console.log(error.message);
    }
  }

  function handleDeleteImage(imageUrl) {
    const updatedImages = productImages.filter((img) => img.url !== imageUrl);
    setProductImages(updatedImages);
  }

  function validateForm() {
    let isValid = true;
    let errors = [];

    if (productNameRef.current.value.length < 2) {
      let msg = "Product name must contain at least 2 characters";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productNameError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productNameError: "",
        };
      });
    }

    if (productDescriptionRef.current.value.length < 5) {
      let msg = "Product description must contain at least 5 characters";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productDescriptionError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productDescriptionError: "",
        };
      });
    }

    if (!productCategoryRef.current.value) {
      let msg = "Please select a valid category";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productCategoryError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productCategoryError: "",
        };
      });
    }

    if (!productSubcategoryRef.current.value) {
      let msg = "Please select a valid subcategory";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productSubcategoryError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productSubcategoryError: "",
        };
      });
    }

    if (!productPriceRef.current.value || productPriceRef.current.value < 0) {
      let msg = "The price must be bigger or equal to 0";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productPriceError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productPriceError: "",
        };
      });
    }

    if (
      !productDiscountRef.current.value ||
      productDiscountRef.current.value < 0
    ) {
      let msg = "The discount must be bigger or equals to 0";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productDiscountError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productDiscountError: "",
        };
      });
    }

    if (
      !productQuantityRef.current.value ||
      productQuantityRef.current.value < 0
    ) {
      let msg = "Quantity must be bigger or equals to 0";
      errors.push(msg);
      setMessages((prev) => {
        return {
          ...prev,
          productQuantityError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productQuantityError: "",
        };
      });
    }

    if (
      !productGuaranteeRef.current.value ||
      (productGuaranteeRef.current.value != "true" &&
        productGuaranteeRef.current.value != "false")
    ) {
      let msg = "Please select if the product has a guarantee";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productGuaranteeError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productGuaranteeError: "",
        };
      });
    }

    if (productTagsRef.current.value.trim().length < 1) {
      let msg =
        "Product must contain at least 1 tag! (Be sure you saved the tags)";
      errors.push(msg);

      setMessages((prev) => {
        return {
          ...prev,
          productTagsError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productTagsError: "",
        };
      });
    }

    const images = document.getElementById("edit-product-photos-image").files;

    if (productImages.length < 1 && !images) {
      let msg = "Product must contain at least 1 image";
      errors.push(msg);
      setMessages((prev) => {
        return {
          ...prev,
          productImagesError: msg,
        };
      });

      isValid = false;
    } else {
      setMessages((prev) => {
        return {
          ...prev,
          productImagesError: "",
        };
      });
    }

    if (!isValid) {
      let final =
        "The next validation errors occurs. Please resolve them and try again: \r\n";
      for (let i = 0; i < errors.length; i++) {
        final += ` (${i + 1}). ${errors[i]} \r\n`;
      }

      console.log("EDITING ERRORS", final);

      setEditProductResponseMessage("");
      setEditProductErrorMessage(final);
    }

    return isValid;
  }

  const ThumbnailOverlayHolder = styled(Box)({
    "&:hover": {
      opacity: "1.0",
    },
    position: "absolute",
    bottom: "30%",
    top: "30%",
    opacity: "0.8",
    left: "30%",
    right: "30%",
    color: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
  });

  const ActionIconButton = styled(IconButton)({
    position: "absolute",
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  });

  return (
    <AdminMainWrapper>
      <Divider>
        <HeadingChip label="MAIN INFO" variant="outlined" color="secondary" />
      </Divider>
      <form component="form" onSubmit={onEditProduct}>
        <InputBox>
          <UniversalInput
            label="Product name"
            variant="outlined"
            sx={{ fontSize: 24 }}
            inputRef={productNameRef}
            placeholder={productName}
            defaultValue={productName}
          />
          {messages.productNameError ? (
            <Alert variant="filled" severity="error">
              {messages.productNameError}
            </Alert>
          ) : (
            <></>
          )}
        </InputBox>
        <InputBox>
          <UniversalInput
            label="Brand"
            variant="outlined"
            inputRef={productBrandRef}
            placeholder={productBrand}
            defaultValue={productBrand}
          />
        </InputBox>
        <InputBox>
          <UniversalInput
            label="Description"
            variant="outlined"
            multiline={true}
            rows={10}
            inputRef={productDescriptionRef}
            placeholder={productDescription}
            defaultValue={productDescription}
          />
          {messages.productDescriptionError ? (
            <Alert variant="filled" severity="error">
              {messages.productDescriptionError}
            </Alert>
          ) : (
            <></>
          )}
        </InputBox>
        <InputBox>
          <Grid container spacing={3} sx={{ textAlign: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Divider>
                <SubheadingChip
                  label="CHANGE CATEGORY"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              <select
                style={StyledSelect}
                ref={productCategoryRef}
                name="category"
                defaultValue={productCategoryId}
                onChange={loadSubcategories}
              >
                {categories?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
              {messages.productCategoryError ? (
                <Alert variant="filled" severity="error">
                  {messages.productCategoryError}
                </Alert>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Divider>
                <SubheadingChip
                  label="CHANGE SUBCATEGORY"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              <select
                style={StyledSelect}
                name="subcategory"
                defaultValue={productSubcategoryId}
                ref={productSubcategoryRef}
                onChange={setValuesToStates}
              >
                {subcategories?.map((subcategory) => (
                  <option key={subcategory?.id} value={subcategory.id}>
                    {subcategory?.name}
                  </option>
                ))}
              </select>
              {messages.productSubcategoryError ? (
                <Alert variant="filled" severity="error">
                  {messages.productSubcategoryError}
                </Alert>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </InputBox>
        <Box>
          <Divider>
            <HeadingChip label="PRICE" variant="outlined" color="secondary" />
          </Divider>
          <InputBox>
            <Grid container spacing={3} sx={{ textAlign: "center" }}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <UniversalInput
                  onChange={setValuesToStates}
                  type="number"
                  label="Price"
                  variant="outlined"
                  inputRef={productPriceRef}
                  defaultValue={productPrice.toString()}
                  placeholder={productPrice.toString()}
                  inputProps={{
                    step: "0.01",
                    min: "0.00",
                  }}
                />
                {messages.productPriceError ? (
                  <Alert variant="filled" severity="error">
                    {messages.productPriceError}
                  </Alert>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <UniversalInput
                  onChange={setValuesToStates}
                  label="Discount (%)"
                  variant="outlined"
                  type="number"
                  inputRef={productDiscountRef}
                  defaultValue={productDiscount.toString()}
                  placeholder={productDiscount.toString()}
                  inputProps={{
                    step: "0.1",
                    min: "0.00",
                  }}
                />
                {messages.productDiscountError ? (
                  <Alert variant="filled" severity="error">
                    {messages.productDiscountError}
                  </Alert>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </InputBox>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <UniversalInput
                label="Final Price"
                variant="outlined"
                disabled
                value={finalPrice.toFixed(2)}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>

              <UniversalInput
                label="Currency"
                variant="outlined"
                disabled
                defaultValue={appSettings.appCurrency.code}
              />

            </InputBox>
          </Box>
          <InputBox>
            <Divider>
              <HeadingChip
                label="QUANTITY & GUARANTEE"
                variant="outlined"
                color="secondary"
              />
            </Divider>
            <Grid container spacing={3} sx={{ textAlign: "center" }}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Divider>
                  <SubheadingChip
                    label="QUANTITY"
                    variant="outlined"
                    color="primary"
                  />
                </Divider>
                <UniversalInput
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  inputRef={productQuantityRef}
                  defaultValue={productQuantity.toString()}
                  placeholder={productQuantity.toString()}
                  inputProps={{
                    min: "0",
                  }}
                />
                {messages.productQuantityError ? (
                  <Alert variant="filled" severity="error">
                    {messages.productQuantityError}
                  </Alert>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Divider>
                  <SubheadingChip
                    label="HAS GUARANTEE"
                    variant="outlined"
                    color="primary"
                  />
                </Divider>
                <select
                  style={StyledSelect}
                  name="guarantee"
                  defaultValue={productHasGuarantee}
                  ref={productGuaranteeRef}
                  onChange={setValuesToStates}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
                {messages.productGuaranteeError ? (
                  <Alert variant="filled" severity="error">
                    {messages.productGuaranteeError}
                  </Alert>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </InputBox>
        </Box>
        <Box>
          <Divider>
            <HeadingChip
              label="SPECIFICATIONS"
              variant="outlined"
              color="secondary"
            />
          </Divider>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "50%" }}></Box>
              <Box sx={{ width: "50%" }}></Box>
            </Box>
            {productSpecifications.map((spec, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <UniversalInput
                      label="Spec. key"
                      variant="outlined"
                      readOnly
                      defaultValue={spec.key}
                    />
                  </InputBox>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <UniversalInput
                      label="Spec. value"
                      variant="outlined"
                      readOnly
                      defaultValue={spec.value}
                    />
                  </InputBox>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <UniversalInput
                    label="Spec. key"
                    inputRef={productSpecificationKeyRef}
                    placeholder="Add specification key"
                  />
                </InputBox>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <UniversalInput
                    label="Spec. value"
                    inputRef={productSpecificationValueRef}
                    id="spec-value"
                    placeholder="Add specification Value"
                  />
                </InputBox>
              </Box>
            </Box>
            <AddSpecificationButton
              onClick={setValuesToStates}
              size="small"
              variant="contained"
              color="primary"
            >
              Save Specification
            </AddSpecificationButton>
          </Box>
        </Box>
        <Divider>
          <HeadingChip label="TAGS" variant="outlined" color="secondary" />
        </Divider>
        <TagsWrapper>
          <TagWord>Tags:</TagWord>
          {productTags.map((tag, index) => (
            <StyledChip
              key={index}
              label={tag.toUpperCase()}
              color="warning"
            ></StyledChip>
          ))}
          <IconButton color="secondary" size="large" onClick={handleTagsInput}>
            {tagsInput ? (
              <RemoveCircle sx={{ fontSize: 35 }} />
            ) : (
              <AddCircle sx={{ fontSize: 35 }} />
            )}
          </IconButton>
        </TagsWrapper>
        {messages.productTagsError ? (
          <Alert variant="filled" severity="error">
            {messages.productTagsError}
          </Alert>
        ) : (
          <></>
        )}
        <Collapse in={tagsInput}>
          <InputBox>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={10}>
                <UniversalInput
                  label="Tags separated by comma"
                  variant="outlined"
                  inputRef={productTagsRef}
                  multiline
                  defaultValue={productTags.join(", ").toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <Box sx={{ marginTop: 1 }}>
                  <SaveTagsButton
                    onClick={setValuesToStates}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    save tags
                  </SaveTagsButton>
                </Box>
              </Grid>
            </Grid>
          </InputBox>
        </Collapse>
        <Divider>
          <HeadingChip label="LABELS" variant="outlined" color="secondary" />
        </Divider>
        <TagsWrapper>
          <TagWord>Labels:</TagWord>
          {productLabels.map((label, index) => (
            <StyledChip
              key={index}
              label={label.toUpperCase()}
              color="success"
            ></StyledChip>
          ))}
          <IconButton
            color="secondary"
            size="large"
            onClick={handleLabelsInput}
          >
            {labelsInput ? (
              <RemoveCircle sx={{ fontSize: 35 }} />
            ) : (
              <AddCircle sx={{ fontSize: 35 }} />
            )}
          </IconButton>
        </TagsWrapper>
        <Collapse in={labelsInput}>
          <InputBox>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={10}>
                <UniversalInput
                  label="Labels separated by comma"
                  inputRef={productLabelsRef}
                  multiline
                  defaultValue={productLabels.join(", ").toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <Box sx={{ marginTop: 1 }}>
                  <SaveTagsButton
                    onClick={setValuesToStates}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    save labels
                  </SaveTagsButton>
                </Box>
              </Grid>
            </Grid>
          </InputBox>
        </Collapse>
        <Divider>
          <HeadingChip
            label="PRODUCT IMAGES"
            variant="outlined"
            color="secondary"
          />
        </Divider>
        <Grid container spacing={2} sx={{ marginBottom: theme.spacing(3) }}>
          {productImages?.map((image, index) => (
            <Grid
              key={index}
              id=""
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              sx={{
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  outlineColor: theme.palette.primary.main,
                  outlineStyle: "solid",
                  outlineWidth: "2px",
                  boxShadow: theme.palette.dropdown.boxShadow.main,
                },
              }}
            >
              <Box>
                <Tooltip arrow title="Delete image">
                  <ActionIconButton
                    sx={{ top: 0 }}
                    onClick={() => onDeleteImage(image.url)}
                  >
                    <Cancel color="error" />
                  </ActionIconButton>
                </Tooltip>
                {!image.isThumbnail ? (
                  <Tooltip arrow title="Set image as thumbnail">
                    <ActionIconButton
                      sx={{ top: 60 }}
                      onClick={() => onSetThumbnail(image.url)}
                    >
                      <Photo color="info" />
                    </ActionIconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Box>
              <img
                src={`${image.url}`}
                width={150}
                height={140}
                alt={productName}
                loading="lazy"
                sx={{ objectFit: "cover" }}
              />
              {image.isThumbnail ? (
                <Tooltip arrow title="Image is thumbnail of the product">
                  <ThumbnailOverlayHolder sx={{}}>
                    {" "}
                    <Photo sx={{ fontSize: 50, width: "100%" }} />
                  </ThumbnailOverlayHolder>
                </Tooltip>
              ) : (
                <></>
              )}
            </Grid>
          ))}
        </Grid>
        <Box>
          {deleteProductImageResponseMessage ? (
            <Zoom
              in={deleteProductImageResponseMessage.length > 0 ? true : false}
            >
              <Alert
                sx={{ marginTop: theme.spacing(1) }}
                variant="filled"
                severity="success"
              >
                {deleteProductImageResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {deleteProductImageErrorMessage ? (
            <Zoom in={deleteProductImageErrorMessage.length > 0 ? true : false}>
              <Alert
                variant="filled"
                sx={{ marginTop: theme.spacing(1) }}
                severity="error"
              >
                {deleteProductImageErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
        </Box>
        <Box>
          {thumbnailResponseMessage ? (
            <Zoom in={thumbnailResponseMessage.length > 0 ? true : false}>
              <Alert
                sx={{ marginTop: theme.spacing(1) }}
                variant="filled"
                severity="success"
              >
                {thumbnailResponseMessage}
              </Alert>
            </Zoom>
          ) : (
            ""
          )}
          {thumbnailErrorMessage ? (
            <Zoom in={thumbnailErrorMessage.length > 0 ? true : false}>
              <Alert
                variant="filled"
                sx={{ marginTop: theme.spacing(1) }}
                severity="error"
              >
                {thumbnailErrorMessage}
              </Alert>
            </Zoom>
          ) : (
            <></>
          )}
        </Box>
        <InputBox
          sx={{
            marginTop: 2,
            borderStyle: "dashed",
            borderColor: theme.palette.primary.main,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.shape.borderRadius.main,
          }}
        >
          <Typography
            variant="h6"
            sx={{ pt: 4, color: theme.palette.primary.main }}
          >
            <AddPhotoAlternate sx={{ mr: 1, fontSize: 35 }} />
            ADD MORE IMAGES
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              pt: 2,
              color: theme.palette.warning.main,
            }}
          >
            {allowedFileFormats} file formats are allowed
          </Typography>
          <TextField
            sx={{ p: theme.spacing(3, 0, 7, 0) }}
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="edit-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />
          {/*
          <UniversalInput
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="edit-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />

         */}
        </InputBox>
        <Typography
          sx={{
            fontWeight: 500,
            textAlign: "center",
            marginTop: theme.spacing(3),
          }}
          variant="h5"
        >
          IF YOU ARE READY:
        </Typography>
        <CompleteActionButton
          color="secondary"
          startIcon={<Edit />}
          type="submit"
          size="big"
          variant="contained"
        >
          EDIT PRODUCT
        </CompleteActionButton>
      </form>
      <Box>
        {editProductResponseMessage ? (
          <Zoom in={editProductResponseMessage.length > 0 ? true : false}>
            <Alert
              sx={{ marginTop: theme.spacing(1) }}
              variant="filled"
              severity="success"
            >
              {editProductResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {editProductErrorMessage ? (
          <Zoom in={editProductErrorMessage.length > 0 ? true : false}>
            <Alert
              variant="filled"
              sx={{ marginTop: theme.spacing(1) }}
              severity="error"
            >
              {editProductErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
      </Box>
    </AdminMainWrapper>
  );
}
