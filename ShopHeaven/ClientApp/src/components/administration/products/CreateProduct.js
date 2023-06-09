import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  Grid,
  Divider,
  Alert,
  Zoom,
  TextField,
} from "@mui/material";
import {
  SaveTagsButton,
  StyledSelect,
  HeadingChip,
  SubheadingChip,
  UniversalInput,
  InputBox,
  AddSpecificationButton,
  StyledChip,
  TagsWrapper,
  CompleteActionButton,
  TagWord,
  AdminMainWrapper
} from "../../../styles/styles";
import {
  AddCircle,
  RemoveCircle,
  AddPhotoAlternate,
} from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import useAuth from "../../../hooks/useAuth";
import useAppSettings from "../../../hooks/useAppSettings";
import { ApiEndpoints } from "../../../api/endpoints";
import {
  noPermissionsForOperationMessage,
  allowedFileFormats,
} from "../../../constants";

export default function CreateProduct(props) {
  // api requests
  const axiosPrivateForm = useAxiosPrivateForm();

  //app settings
  const { appSettings } = useAppSettings();

  //auth
  const { auth } = useAuth();

  //dropdowns
  const [categories, setCategories] = useState(props.categories);
  const [subcategories, setSubcategories] = useState([]);

  //form states
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategoryId, setProductCategoryId] = useState(""); // must be category.id
  const [productSubcategoryId, setProductSubcategoryId] = useState("");
  const [productHasGuarantee, setProductHasGuarantee] = useState("");
  const [productSpecifications, setProductSpecifications] = useState([]); //array[object]
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImages, setProductImages] = useState([]); // array[{}]
  const [productTags, setProductTags] = useState([]); // array[string]
  const [productLabels, setProductLabels] = useState([]); // array[string]

  const [finalPrice, setFinalPrice] = useState(0);

  const [tagsInput, setTagsInput] = useState(true);
  const [labelsInput, setLabelsInput] = useState(true);

  //product creation refs
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
    productImagesError: "",
  });

  const [createProductResponseMessage, setCreateProductResponseMessage] =
    useState("");
  const [createProductErrorMessage, setCreateProductErrorMessage] =
    useState("");

  useEffect(() => { }, [messages]);

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

    //3
    setValuesToStates();

    setSubcategories(
      (prev) =>
        categories.find((x) => x.id === checkedCategoryId)?.subcategories
    );
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

    const images = document.getElementById("create-product-photos-image").files;
    setProductImages(images);
    console.log(images);

    const checkedHasGuarantee = productGuaranteeRef.current.value === "true";
    setProductHasGuarantee(checkedHasGuarantee);

    const price = parseFloat(productPriceRef.current.value);
    const discount = parseFloat(productDiscountRef.current.value);
    const totalPrice = price - price * (discount / 100);
    setFinalPrice(totalPrice);

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

  function onCreateProduct(e) {
    e.preventDefault();

    //4
    setValuesToStates();

    let isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    const images = document.getElementById("create-product-photos-image").files;
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

    createProduct(formData);
  }

  async function createProduct(formData) {
    try {
      const controller = new AbortController();

      const response = await axiosPrivateForm.post(
        ApiEndpoints.products.createProduct,
        formData,
        {
          signal: controller.signal,
        }
      );

      controller.abort();
      setCreateProductErrorMessage("");
      setCreateProductResponseMessage(
        `${formData.get("name")} successfully created`
      );

      window.scroll(0, 0);

      props.productListChanged(response?.data);
    } catch (error) {
      setCreateProductResponseMessage("");

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setCreateProductErrorMessage(noPermissionsForOperationMessage);
      } else {
        setCreateProductErrorMessage(error?.response?.data);
      }
      console.log(error?.message);
    }
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

    const images = document.getElementById("create-product-photos-image").files;
    if (!images || images.length < 1) {
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
      setCreateProductResponseMessage("");
      setCreateProductErrorMessage(final);
    }

    return isValid;
  }

  return (
    <AdminMainWrapper>
      <Divider>
        <HeadingChip label="MAIN INFO" variant="outlined" color="secondary" />
      </Divider>
      <form component="form" onSubmit={onCreateProduct}>
        <InputBox>
          <UniversalInput
            label="Product Name"
            sx={{ fontSize: 24 }}
            inputRef={productNameRef}
            placeholder="Example: Smartphone Samsung Galaxy A53"
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
            inputRef={productBrandRef}
            placeholder="Example: Samsung"
            defaultValue={productBrand}
          />
        </InputBox>
        <InputBox>
          <UniversalInput
            label="Description"
            multiline
            minRows={4}
            inputRef={productDescriptionRef}
            placeholder="Example: This smartphone is one of the best cellphones in the industry"
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
                  label="SELECT CATEGORY"
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
                {" "}
                <option value={""}>{"--- CHOOSE MAIN CATEGORY ---"}</option>
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
                  label="SELECT SUBCATEGORY"
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
                  <option key={subcategory?.id} value={subcategory?.id}>
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
        <Box sx={{ display: "block" }}>
          <InputBox>
            <Divider>
              <HeadingChip label="PRICE" variant="outlined" color="secondary" />
            </Divider>
          </InputBox>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <UniversalInput
                onChange={setValuesToStates}
                label="Price"
                type="number"
                inputRef={productPriceRef}
                defaultValue={productPrice.toString()}
                placeholder={"0.00"}
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
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <UniversalInput
                onChange={setValuesToStates}
                label="Discount"
                type="number"
                inputRef={productDiscountRef}
                defaultValue={productDiscount.toString()}
                placeholder={"0.00"}
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
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <UniversalInput
                label="Final Price"
                disabled
                value={finalPrice.toFixed(2)}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <UniversalInput
                label="Currency"
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
                  type="number"
                  inputRef={productQuantityRef}
                  defaultValue={productQuantity.toString()}
                  placeholder="0"
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
            {productSpecifications?.map((spec, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <UniversalInput
                      label="Spec. key"
                      readOnly
                      defaultValue={spec.key}
                    />
                  </InputBox>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <UniversalInput
                      label="Spec. value"
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
                    placeholder="Example: Color"
                  />
                </InputBox>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <UniversalInput
                    label="Spec. value"
                    inputRef={productSpecificationValueRef}
                    id="spec-value"
                    placeholder="Example: Black"
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
                  inputRef={productTagsRef}
                  multiline
                  placeholder="phone, samsung, 4G"
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
                  placeholder="new, popular"
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
        <InputBox
          sx={{
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
            UPLOAD IMAGES
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
            sx={{ p: theme.spacing(3, 0, 7, 0), color: "blue" }}
            accept={allowedFileFormats}
            type="file"
            variant="outlined"
            id="create-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />
          {/*           <UniversalInput
            accept=".jpg, .png, .jpeg, .webp"
            type="file"
            variant="outlined"
            id="create-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />*/}

          {messages.productImagesError ? (
            <Alert variant="filled" severity="error">
              {messages.productImagesError}
            </Alert>
          ) : (
            <></>
          )}
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
          startIcon={<AddCircle />}
          color="secondary"
          type="submit"
          size="big"
          variant="contained"
        >
          CREATE PRODUCT
        </CompleteActionButton>
      </form>
      <Box>
        {createProductResponseMessage ? (
          <Zoom in={createProductResponseMessage.length > 0 ? true : false}>
            <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
              {createProductResponseMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
        {createProductErrorMessage ? (
          <Zoom in={createProductErrorMessage.length > 0 ? true : false}>
            <Alert
              variant="filled"
              sx={{ marginTop: theme.spacing(1) }}
              severity="error"
            >
              {createProductErrorMessage}
            </Alert>
          </Zoom>
        ) : (
          ""
        )}
      </Box>
    </AdminMainWrapper>
  );
}
