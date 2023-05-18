import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Chip,
  InputBase,
  FormControlLabel,
  Switch,
  ImageList,
  ImageListItem,
  ListItemIcon,
  Collapse,
  Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close, AddCircle, RemoveCircle } from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import { ApiEndpoints } from "../../../api/endpoints";

export default function EditProduct(props) {
  const axiosPrivateForm = useAxiosPrivateForm();

  const [product, setProduct] = useState(props.product);
  const [categories, setCategories] = useState(props.categories);
  const [subcategories, setSubcategories] = useState([]);

  const [productName, setProductName] = useState(product.name);
  const [productBrand, setProductBrand] = useState(product.brand);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productCategory, setProductCategory] = useState(product.category);
  const [productSubcategory, setProductSubcategory] = useState(product.subcategory);
  const [productHasGuarantee, setProductHasGuarantee] = useState(product.hasGuarantee);
  const [productSpecifications, setProductSpecifications] = useState(product.specifications); //array[object]
  const [productCurrency, setProductCurrency] = useState(product.currency);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDiscount, setProductDiscount] = useState(product.discount);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productImages, setProductImages] = useState(product.images); // array[string]
  const [productTags, setProductTags] = useState(product.tags) // array[string]

  const [tagsInput, setTagsInput] = useState(false);
 


  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState("");

  //product editing refs
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
  let productSpecificationKeyRef = useRef();
  let productSpecificationValueRef = useRef();

  useEffect(() => { }, [productSpecifications]);

  function handleSetProductSpecifications(e) {
    const key = productSpecificationKeyRef.current.value;
    const value = productSpecificationValueRef.current.value;

    setValuesToStates()

    setProductSpecifications((prev) => [...prev, { key: key, value: value }]);
    console.log(productSpecifications);
  }

  function handleTagsInput() {
    setTagsInput(prev => !prev);
  }

  function handleProductHasGuarantee() {
    setValuesToStates()
    setProductHasGuarantee((prev) => !prev);
  }

  function setValuesToStates(){
    const images = document.getElementById('edit-product-photos-image').files;
    let tags = productTagsRef.current.value.split(",");
    console.log(tags);
    setProductName(productNameRef.current.value);
    setProductBrand(productBrandRef.current.value);
    setProductDescription(productDescriptionRef.current.value);
    setProductCategory(productCategoryRef.current.value);
    setProductSubcategory(productSubcategoryRef.current.value);
    setProductHasGuarantee(productGuaranteeRef.current.checked);
    setProductCurrency(productCurrencyRef.current.value);
    setProductPrice(productPriceRef.current.value);
    setProductDiscount(productDiscountRef.current.value);
    setProductQuantity(productQuantityRef.current.value);
    setProductImages(images);
    setProductTags(tags)
  }

  function loadSubcategories() {
    const checkedCategory = productCategoryRef.current.value;
    console.log(checkedCategory);
    setSubcategories(
      (prev) =>
        categories.find(
          (x) => x.name.toLowerCase() === checkedCategory.toLowerCase()
        )?.subcategories
    );
  }

  function onEditProduct(e){
    e.preventDefault();

    const name = productNameRef.current.value;
    const brand = productBrandRef.current.value;
    const description = productDescriptionRef.current.value;
    const category = productCategoryRef.current.value;
    const subcategory = productSubcategoryRef.current.value;
    const hasGuarantee = productGuaranteeRef.current.checked;
    const currency = productCurrencyRef.current.value;
    const price = productPriceRef.current.value;
    const discount = productDiscountRef.current.value;
    const quantity = productQuantityRef.current.value;
    const images = document.getElementById('edit-product-photos-image').files;
    const specifications = productSpecifications; //array oj objects key-value
    const tags = productTagsRef.current.value.split(",");

    setValuesToStates();
    
    console.log("NAME",name)
    console.log("BRAND",brand)
    console.log("DESCRIPTION",description)
    console.log("CATEGORY",category)
    console.log("SUBCATEOGRY",subcategory)
    console.log("HAS HUARANTEE",hasGuarantee)
    console.log("CURENCY",currency)
    console.log("PRICE",price)
    console.log("DISCOUNT",discount)
    console.log("QUANTITY",quantity)
    console.log("IMAGES",images)
    console.log("SPECIFICATIONS",specifications)
    console.log("TAGS",tags)
  }

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.error.main,
  });

  const TagsWrapper = styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    gap: 8,
    fontWeight: 500,
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      position: "relative",
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  });

  const StyledChip = styled(Chip)({
    cursor: "pointer",
    textAlign: "left",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  });

  const ProductInfoInput = styled(InputBase)({
    background: "rgb(255,249,249)",
    width: "100%",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(0.3),
    paddingBottom: theme.spacing(0.3),
    paddingLeft: theme.spacing(1),
    paddingRigth: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  });

  const StyledFormControlLabel = styled(FormControlLabel)({
    color: productHasGuarantee
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const AddSpecificationButton = styled(Button)({
    width: "95%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(2),
  });

  const StyledImageList = styled(ImageList)({
    padding: theme.spacing(0.5),
  });

  const StyledImageListItem = styled(ImageListItem)({
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      outlineColor: theme.palette.primary.main,
      outlineStyle: "solid",
      outlineWidth: "3px",
      boxShadow: theme.palette.dropdown.boxShadow.main,
    },
  });

  const EditProductButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

  const StyledSelect = {
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    backgroundColor: "rgb(255,249,249)",
  };

  return (
    <Paper
      sx={{ padding: 2, marginTop: theme.spacing(2), border: "2px solid red" }}
    >
      <Typography variant="h6" gutterBottom component="div">
        EDIT PRODUCT INFO
      </Typography>
      <form component="form" onSubmit={onEditProduct}>
        <InputBox>
          <ProductInfoInput
            sx={{ fontSize: 24 }}
            inputRef={productNameRef}
            placeholder={productName}
            defaultValue={productName}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={productBrandRef}
            placeholder={productBrand}
            defaultValue={productBrand}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            multiline
            minRows={4}
            inputRef={productDescriptionRef}
            placeholder={productDescription}
            defaultValue={productDescription}
          />
        </InputBox>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">CHANGE CATEGORY:</Typography>
          <Box sx={{ display: "flex", gap: 5, width: "100%" }}>
            <select
              style={StyledSelect}
              ref={productCategoryRef}
              defaultValue={productCategory}
              name="category"
              onChange={loadSubcategories}
            > 
              {categories?.map((option) => (
                <option key={option?.id} value={option?.name}>
                  {option?.name}
                </option>
              ))}
            </select>
            <select
              style={StyledSelect}
              name="subcategory"
              defaultValue={productSubcategory}
              ref={productSubcategoryRef}
            >
              {subcategories?.map((option) => (
                <option key={option?.id} value={option?.name}>
                  {option?.name}
                </option>
              ))}
            </select>
            {/*
              <InputBox>  
                <InputBase
                  inputRef={productCategoryRef}
                  select
                  defaultValue={productCategory}
                  helperText="Please select main category"
                  variant="standard"
                >
                  {categories?.map((option) => (
                    <MenuItem key={option?.id} value={option?.name}>
                      {option?.name}
                    </MenuItem>
                  ))}
                </InputBase>
              </InputBox>
              <Button onClick={loadSubcategories} variant="contained" size="small">
                Load Subcategories
              </Button>
                        
              <InputBox>

                <TextField
                  inputRef={productSubcategoryRef}
                  select
                  defaultValue={productSubcategory}
                  helperText="Please select subcategory"
                  variant="standard"
                >
                  {subcategories?.map((option) => (
                    <MenuItem key={option?.id} value={option?.name}>
                      {option?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </InputBox>
                  */}
          </Box>
        </Box>
        <Box sx={{ marginTop: theme.spacing(5) }}>
          <Box sx={{ display: "block" }}>
            <InputBox>
              <Typography variant="h6">Guarantee:</Typography>
              <StyledFormControlLabel
                onChange={handleProductHasGuarantee}
                sx={{
                  width: "100%",
                  display: "block",
                  marginLeft: "auto",
                }}
                inputRef={productGuaranteeRef}
                control={
                  productHasGuarantee ? <Switch defaultChecked /> : <Switch />
                }
                label={productHasGuarantee ? "Yes" : "No"}
              />
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Currency:</Typography>
              <ProductInfoInput
                inputRef={productCurrencyRef}
                defaultValue={productCurrency}
                placeholder={productCurrency}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Price:</Typography>
              <ProductInfoInput
                inputRef={productPriceRef}
                defaultValue={productPrice}
                placeholder={productPrice}
              />
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Discount:</Typography>
              <ProductInfoInput
                inputRef={productDiscountRef}
                defaultValue={`${productDiscount}%`}
                placeholder={`${productDiscount}%`}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Quantity:</Typography>
              <ProductInfoInput
                inputRef={productQuantityRef}
                defaultValue={productQuantity}
                placeholder={productQuantity}
              />
            </InputBox>
            {/*
          <InputBox sx={{width: "50%"}}>
            <Typography variant="h6" color="error">
              Final Price:
            </Typography>
            <ProductInfoInput
              disabled
              inputRef={productNameRef}
              defaultValue={
                product?.price - product?.price * (product?.discount / 100)
              }
            />
          </InputBox>
            */}
          </Box>
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginTop: theme.spacing(6) }}
        >
          PRODUCT IMAGES
        </Typography>
        <StyledImageList cols={5}>
          {product?.images.map((item, index) => (
            <StyledImageListItem key={index} sx={{ width: "90%" }}>
              <ListItemIcon
                sx={{ position: "absolute", zIndex: 1, right: -15 }}
              >
                <IconButton>
                  <Close sx={{ color: theme.palette.error.main }} />
                </IconButton>
              </ListItemIcon>
              <img
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={productName}
                loading="lazy"
              />
            </StyledImageListItem>
          ))}
        </StyledImageList>
        <InputBox>
          <ProductInfoInput
            accept=".jpg, .png, .jpeg"
            type="file"
            variant="outlined"
            id="edit-product-photos-image"
            inputProps={{
              multiple: true,
            }}
          />
        </InputBox>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ marginTop: theme.spacing(6) }}
          >
            SPECIFICATIONS
          </Typography>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "50%",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                Specification key
              </Box>
              <Box
                sx={{
                  width: "50%",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              >
                Specification value
              </Box>
            </Box>
            {productSpecifications.map((spec, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <ProductInfoInput defaultValue={spec.key} />
                  </InputBox>
                </Box>
                <Box sx={{ width: "50%" }}>
                  <InputBox>
                    <ProductInfoInput defaultValue={spec.value} />
                  </InputBox>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <ProductInfoInput
                    inputRef={productSpecificationKeyRef}
                    placeholder="Add specification key"
                  />
                </InputBox>
              </Box>
              <Box sx={{ width: "50%" }}>
                <InputBox>
                  <ProductInfoInput
                    inputRef={productSpecificationValueRef}
                    id="spec-value"
                    placeholder="Add specification Value"
                  />
                </InputBox>
              </Box>
            </Box>
            <AddSpecificationButton
              onClick={handleSetProductSpecifications}
              size="small"
              variant="contained"
            >
              Add Specification
            </AddSpecificationButton>
          </Box>
        </Box>
        <TagsWrapper>
          Tags:
          {product?.tags.map((tag, index) => (
            <StyledChip key={index} label={tag} color="secondary"></StyledChip>
          ))}
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            onClick={handleTagsInput}
          >
            {tagsInput ? <RemoveCircle /> : <AddCircle />}
          </IconButton>
        </TagsWrapper>
        <Collapse in={tagsInput}>
          <InputBox>
            <ProductInfoInput
              sx={{
                marginTop: theme.spacing(0),
                marginLeft: theme.spacing(3),
              }}
              inputRef={productTagsRef}
              multiline
              defaultValue={`${productTags.map((tag, index) => {
                return tag;
              })}`}
            />
            <Typography
              sx={{
                display: "block",
                fontWeight: 500,
                marginLeft: 3,
                marginTop: 1,
              }}
            >
              (tags separated by comma)
            </Typography>
          </InputBox>
        </Collapse>
        <EditProductButton type="submit" size="medium" variant="contained">
          EDIT PRODUCT
        </EditProductButton>
      </form>
      <Box>
        <ResponseMessage>{editProductResponseMessage}</ResponseMessage>
        <ErrorResponseMessage>{editProductErrorMessage}</ErrorResponseMessage>
      </Box>
    </Paper>
  );
}
