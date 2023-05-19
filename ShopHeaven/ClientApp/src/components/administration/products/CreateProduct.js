import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Chip,
  InputBase,
  ImageList,
  ImageListItem,
  ListItemIcon,
  Collapse,
  Grid,
  Divider,
  Alert,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close, AddCircle, RemoveCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import { ApiEndpoints } from "../../../api/endpoints";

export default function CreateProduct(props) {
 // api requests
 const axiosPrivateForm = useAxiosPrivateForm();

 const [product, setProduct] = useState();

 //dropdowns
 const [categories, setCategories] = useState(props.categories);
 const [subcategories, setSubcategories] = useState([]);
 const [currencies, setCurrencies] = useState(props.currencies);

 //form states
 const [productName, setProductName] = useState('');
 const [productBrand, setProductBrand] = useState('');
 const [productDescription, setProductDescription] = useState(
   ''
 );
 const [productCategoryId, setProductCategoryId] = useState(''); // must be category.id
 const [productSubcategoryId, setProductSubcategoryId] = useState(
   ''
 );
 const [productHasGuarantee, setProductHasGuarantee] = useState(
   ''
 );
 const [productSpecifications, setProductSpecifications] = useState(
   []
 ); //array[object]
 const [productCurrencyId, setProductCurrencyId] = useState('');
 const [productPrice, setProductPrice] = useState('');
 const [productDiscount, setProductDiscount] = useState('');
 const [productQuantity, setProductQuantity] = useState('');
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
 let productCurrencyRef = useRef();
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
   productCurrencyError: "",
   productPriceError: "",
   productDiscountError: "",
   productQuantityError: "",
   productGuaranteeError: "",
   productTagsError: "",
   productImagesError: ""
 });
 
 const [createProductResponseMessage, setCreateProductResponseMessage] =
   useState("");
 const [createProductErrorMessage, setCreateProductErrorMessage] = useState("");

 useEffect(() => {}, [messages]);

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
   console.log(checkedCategoryId);

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
   setProductCurrencyId(productCurrencyRef.current.value);
   setProductPrice(productPriceRef.current.value);
   setProductDiscount(productDiscountRef.current.value);
   setProductQuantity(productQuantityRef.current.value);

   const images = document.getElementById('create-product-photos-image').files;
   setProductImages(images)
   console.log(images)

   const checkedHasGuarantee = productGuaranteeRef.current.value === "true";
   setProductHasGuarantee(checkedHasGuarantee);

   const price = productPriceRef.current.value;
   const discount = productDiscountRef.current.value;
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

   console.log(tags);
   console.log(labels);
   console.log("GUARANTEE", productHasGuarantee);
   console.log(productSpecifications);
 }

 function onCreateProduct(e) {
   e.preventDefault();

   //4
   setValuesToStates();

   const images = document.getElementById("create-product-photos-image").files;

   const newProduct = {
     name: productName,
     brand: productBrand,
     description: productDescription,
     categoryId: productCategoryId,
     subcategoryId: productSubcategoryId,
     hasGuarantee: productHasGuarantee,
     currency: productCurrencyId,
     price: productPrice,
     discount: productDiscount,
     quantity: productQuantity,
     images: images,
     specifications: productSpecifications,
     tags: productTags,
     labels: productLabels,
   };

   let isFormValid = validateForm();

   if (!isFormValid) {
     return;
   }

   console.log("WHOLE OBJECT", newProduct);
 }

 function validateForm() {
   let isValid = true;

   if (productNameRef.current.value.length < 2) {
     setMessages((prev) => {
       return {
         ...prev,
         productNameError: "Product name must contain at least 2 characters",
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
     setMessages((prev) => {
       return {
         ...prev,
         productDescriptionError:
           "Product description must contain at least 5 characters",
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
     setMessages((prev) => {
       return {
         ...prev,
         productCategoryError: "Please select a valid category",
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
     setMessages((prev) => {
       return {
         ...prev,
         productSubcategoryError: "Please select a valid subcategory",
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

   if (!productCurrencyRef.current.value) {
     setMessages((prev) => {
       return {
         ...prev,
         productCurrencyError: "Please select a valid currency",
       };
     });

     isValid = false;
   } else {
     setMessages((prev) => {
       return {
         ...prev,
         productCurrencyError: "",
       };
     });
   }

   if (!productPriceRef.current.value || productPriceRef.current.value < 0) {
     setMessages((prev) => {
       return {
         ...prev,
         productPriceError: "The price must be bigger or equal to 0",
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
     setMessages((prev) => {
       return {
         ...prev,
         productDiscountError: "The discount must be bigger or equals to 0",
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
     setMessages((prev) => {
       return {
         ...prev,
         productQuantityError: "Quantity must be bigger or equals to 0",
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
     setMessages((prev) => {
       return {
         ...prev,
         productGuaranteeError: "Please select if the product has a guarantee",
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

   let tags = productTagsRef.current.value
     .split(",")
     .map((tag) => tag.trim())
     .filter((tag) => tag.length > 0);

   if (tags.length < 1) {
     setMessages((prev) => {
       return {
         ...prev,
         productTagsError: "Product must contain at least 1 tag",
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

   const images =document.getElementById('create-product-photos-image').files
   if (!images || images.length < 1 ) {
    setMessages((prev) => {
      return {
        ...prev,
        productImagesError: "Product must contain at least 1 image",
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

   console.log(messages);
   return isValid;
 }

 const MainWrapper = styled(Paper)({
   paddingLeft: theme.spacing(2),
   paddingRight: theme.spacing(2),
   paddingBottom: theme.spacing(2),
   marginTop: theme.spacing(2),
 });

 const TagsWrapper = styled(Box)({
   [theme.breakpoints.down("lg")]: {
     position: "relative",
   },
   marginBottom: theme.spacing(2),
 });

 const StyledChip = styled(Chip)({
   cursor: "pointer",
   textAlign: "left",
   marginRight: theme.spacing(0.5),
   borderRadius: theme.shape.borderRadius,
   /*
   "&:hover": {
     backgroundColor: theme.palette.primary.main,
   },
   */
 });

 const ProductInfoInput = styled(InputBase)({
   background: "rgb(255,249,249)",
   width: "100%",
   marginTop: theme.spacing(1),
   marginBottom: theme.spacing(1),
   paddingTop: theme.spacing(0.3),
   paddingBottom: theme.spacing(0.3),
   paddingLeft: theme.spacing(1),
   paddingRight: theme.spacing(1),
   borderRadius: theme.shape.borderRadius,
 });

 const InputBox = styled(Box)({
   marginLeft: theme.spacing(2),
   marginRight: theme.spacing(2),
 });

 const AddSpecificationButton = styled(Button)({
   width: "50%",
   display: "block",
   margin: "auto",
   marginTop: theme.spacing(2),
   [theme.breakpoints.down("sm")]: {
     width: "95%",
   },
 });

 const CreateProductButton = styled(Button)({
   width: "100%",
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(1),
   padding: theme.spacing(2),
 });

 const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    backgroundColor: "rgb(255,249,249)",
    marginTop: theme.spacing(1),
 };

 const SaveTagsButton = styled(Button)({
   width: "95%",
   padding: theme.spacing(1),
   [theme.breakpoints.up("sm")]: {
     width: "50%",
     display: "block",
     margin: "auto",
   },
   [theme.breakpoints.up("md")]: {
     width: "100%",
   },
 });

 const TagWord = styled(Typography)({
   display: "inline",
   fontWeight: 500,
   marginRight: theme.spacing(1),
 });

 const HeadingChip = styled(Chip)({
   fontSize: 21,
   padding: theme.spacing(2),
   fontWeight: 500,
   marginTop: theme.spacing(5),
   marginBottom: theme.spacing(5),
   color: theme.palette.white.main,
   backgroundColor: theme.palette.secondary.main,
 });

 const SubheadingChip = styled(Chip)({
   fontSize: 12,
   marginTop: theme.spacing(2),
   marginBottom: theme.spacing(1)
 });

 const CalculatePriceButton = styled(Button)({
   width: "50%",
   display: "block",
   margin: "auto",
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(4),
   [theme.breakpoints.down("sm")]: {
     width: "95%",
   },
 });

 const ErrorAlert = styled(Alert)({
   fontWeight: 500,
   color: theme.palette.error.main,
 });

  return (
      <MainWrapper>
      <Divider>
        <HeadingChip label="MAIN INFO" variant="outlined" color="secondary" />
      </Divider>
      <form component="form" onSubmit={onCreateProduct}>
        <InputBox>
          <Divider>
            <SubheadingChip label="NAME" variant="outlined" color="primary" />
          </Divider>
          <ProductInfoInput
            sx={{ fontSize: 24 }}
            inputRef={productNameRef}
            placeholder="Example: Smartphone Samsung Galaxy A53"
            defaultValue={productName}
          />
          {messages.productNameError ? (
            <ErrorAlert severity="error">
              {messages.productNameError}
            </ErrorAlert>
          ) : (
            <></>
          )}
        </InputBox>
        <Divider>
          <SubheadingChip label="BRAND" variant="outlined" color="primary" />
        </Divider>
        <InputBox>
          <ProductInfoInput
            inputRef={productBrandRef}
            placeholder="Example: Samsung"
            defaultValue={productBrand}
          />
        </InputBox>
        <InputBox>
          <Divider>
            <SubheadingChip
              label="DESCRIPTION"
              variant="outlined"
              color="primary"
            />
          </Divider>
          <ProductInfoInput
            multiline
            minRows={4}
            inputRef={productDescriptionRef}
            placeholder="Example: This smartphone is one of the best cellphones in the industry"
            defaultValue={productDescription}
          />
          {messages.productDescriptionError ? (
            <ErrorAlert severity="error">
              {messages.productDescriptionError}
            </ErrorAlert>
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
                {categories?.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
              {messages.productCategoryError ? (
                <ErrorAlert severity="error">
                  {messages.productCategoryError}
                </ErrorAlert>
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
                {subcategories?.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
              {messages.productSubcategoryError ? (
                <ErrorAlert severity="error">
                  {messages.productSubcategoryError}
                </ErrorAlert>
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
              <Divider>
                <SubheadingChip
                  label="CURRENCY"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              
              <select
                style={StyledSelect}
                ref={productCurrencyRef}
                name="currency"
                defaultValue={productCurrencyId} 
                onChange={setValuesToStates}
              >
                {currencies?.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {`${option?.code}(${option?.name})`}
                  </option>
                ))}
              </select>
              {messages.productCurrencyError ? (
                <ErrorAlert severity="error">
                  {messages.productCurrencyError}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Divider>
                <SubheadingChip
                  label="PRICE"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              <ProductInfoInput
                type="number"
                inputRef={productPriceRef}
                defaultValue={productPrice.toString()}
                placeholder={'0.00'}
                inputProps={{
                  step: "0.01",
                  min: "0.00",
                }}
              />
              {messages.productPriceError ? (
                <ErrorAlert severity="error">
                  {messages.productPriceError}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <Divider>
                <SubheadingChip
                  label="DISCOUNT (IN %)"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              <ProductInfoInput
                type="number"
                inputRef={productDiscountRef}
                defaultValue={productDiscount.toString()}
                placeholder={'0.00'}
                inputProps={{
                  step: "0.1",
                  min: "0.00",
                }}
              />
              {messages.productDiscountError ? (
                <ErrorAlert severity="error">
                  {messages.productDiscountError}
                </ErrorAlert>
              ) : (
                <></>
              )}
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Divider>
                <SubheadingChip
                  label="FINAL PRICE"
                  variant="outlined"
                  color="primary"
                />
              </Divider>
              <ProductInfoInput disabled defaultValue={finalPrice.toFixed(2)} />
            </InputBox>
          </Box>
          <CalculatePriceButton
            onClick={setValuesToStates}
            size="small"
            variant="contained"
            color="primary"
          >
            CALCULATE FINAL PRICE
          </CalculatePriceButton>
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
                <ProductInfoInput
                  type="number"
                  inputRef={productQuantityRef}
                  defaultValue={productQuantity.toString()}
                  placeholder='0'
                  inputProps={{
                    min: "0",
                  }}
                />
                {messages.productQuantityError ? (
                  <ErrorAlert severity="error">
                    {messages.productQuantityError}
                  </ErrorAlert>
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
                  <ErrorAlert severity="error">
                    {messages.productGuaranteeError}
                  </ErrorAlert>
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
              <Box sx={{ width: "50%" }}>
                <Divider variant="middle">
                  <SubheadingChip
                    label="SPECIFICATION KEY"
                    variant="outlined"
                    color="primary"
                  />
                </Divider>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Divider variant="middle">
                  <SubheadingChip
                    label="SPECIFICATION VALUE"
                    variant="outlined"
                    color="primary"
                  />
                </Divider>
              </Box>
            </Box>
            {productSpecifications?.map((spec, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <ProductInfoInput readOnly defaultValue={spec.key} />
                  </InputBox>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <ProductInfoInput readOnly defaultValue={spec.value} />
                  </InputBox>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <ProductInfoInput
                    inputRef={productSpecificationKeyRef}
                    placeholder="Example: Color"
                  />
                </InputBox>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <ProductInfoInput
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
          <ErrorAlert severity="error">{messages.productTagsError}</ErrorAlert>
        ) : (
          <></>
        )}
        <Collapse in={tagsInput}>
          <InputBox>
            <Divider textAlign="left" sx={{ marginBottom: theme.spacing(1) }}>
              <SubheadingChip
                label="TAGS SEPARATED BY COMMA"
                variant="outlined"
                color="primary"
              />
            </Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={10}>
                <ProductInfoInput
                  sx={{
                    marginTop: 0,
                    padding: 1,
                  }}
                  inputRef={productTagsRef}
                  multiline
                  placeholder="phone, samsung, 4G"
                  defaultValue={productTags.join(", ").toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <SaveTagsButton
                  onClick={setValuesToStates}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  save tags
                </SaveTagsButton>
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
            <Divider textAlign="left" sx={{ marginBottom: theme.spacing(1) }}>
              <SubheadingChip
                label="LABELS SEPARATED BY COMMA"
                variant="outlined"
                color="primary"
              />
            </Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={10}>
                <ProductInfoInput
                  sx={{
                    marginTop: 0,
                    padding: 1,
                  }}
                  inputRef={productLabelsRef}
                  multiline
                  placeholder="new, popular"
                  defaultValue={productLabels.join(", ").toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={2}>
                <SaveTagsButton
                  onClick={setValuesToStates}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  save labels
                </SaveTagsButton>
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
        <InputBox>
          <ProductInfoInput
            accept=".jpg, .png, .jpeg"
            type="file"
            variant="outlined"
            id="create-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />
          {messages.productImagesError ? (
          <ErrorAlert severity="error">{messages.productImagesError}</ErrorAlert>
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
        <CreateProductButton type="submit" size="big" variant="contained">
          CREATE PRODUCT
        </CreateProductButton>
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
            <ErrorAlert sx={{ marginTop: theme.spacing(1) }} severity="error">
              {createProductErrorMessage}
            </ErrorAlert>
          </Zoom>
        ) : (
          ""
        )}
      </Box>
    </MainWrapper>
  );
}
