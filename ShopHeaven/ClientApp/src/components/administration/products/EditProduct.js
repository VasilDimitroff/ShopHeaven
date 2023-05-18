import { React, useState, Fragment, useRef } from "react";
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
  Grid,
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

  //form states
  const [productName, setProductName] = useState(product.name);
  const [productBrand, setProductBrand] = useState(product.brand);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productCategoryId, setProductCategoryId] = useState(product.category); // must be category.id
  const [productSubcategoryId, setProductSubcategoryId] = useState(
    product.subcategory.id
  );
  const [productHasGuarantee, setProductHasGuarantee] = useState(
    product.hasGuarantee
  );
  const [productSpecifications, setProductSpecifications] = useState(
    product.specifications
  ); //array[object]
  const [productCurrency, setProductCurrency] = useState(product.currency);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDiscount, setProductDiscount] = useState(product.discount);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productImages, setProductImages] = useState(product.images); // array[string]
  const [productTags, setProductTags] = useState(product.tags); // array[string]

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

  function handleTagsInput() {
    setTagsInput((prev) => !prev);
  }

  function handleProductHasGuarantee() {
    //1 !!!
    setValuesToStates();
    setProductHasGuarantee((prev) => !prev);
  }

  function loadSubcategories() {
    const checkedCategoryId = productCategoryRef.current.value;
    console.log(checkedCategoryId);

    //2 !!!
    setValuesToStates();

    setSubcategories(
      (prev) =>
        categories.find((x) => x.id === checkedCategoryId)?.subcategories
    );
  }

  function setValuesToStates() {
    let tags = productTagsRef.current.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const key = productSpecificationKeyRef.current.value;
    const value = productSpecificationValueRef.current.value;

    setProductName(productNameRef.current.value);
    setProductBrand(productBrandRef.current.value);
    setProductDescription(productDescriptionRef.current.value);
    setProductCategoryId(productCategoryRef.current.value);
    setProductSubcategoryId(productSubcategoryRef.current.value);
    setProductHasGuarantee(productGuaranteeRef.current.checked);
    setProductCurrency(productCurrencyRef.current.value);
    setProductPrice(productPriceRef.current.value);
    setProductDiscount(productDiscountRef.current.value);
    setProductQuantity(productQuantityRef.current.value);

    if (key.length > 0 && value.length > 0) {
      setProductSpecifications((prev) => [...prev, { key: key, value: value }]);
    }

    setProductTags(tags);

    console.log(tags);
    console.log(productSpecifications);
  }

  function onEditProduct(e) {
    e.preventDefault();

    //setValuesToStates();

    const images = document.getElementById("edit-product-photos-image").files;

    const newProduct = {
      name: productName,
      brand: productBrand,
      description: productDescription,
      categoryId: productCategoryId,
      subcategoryId: productSubcategoryId,
      hasGuarantee: productHasGuarantee,
      currency: productCurrency,
      price: productPrice,
      discount: productDiscount,
      quantity: productQuantity,
      images: images,
      specifications: productSpecifications,
      tags: productTags,
    };

    console.log("WHOLE OBJ", newProduct);
  }

  const ResponseMessage = styled(Typography)({
    textAlign: "center",
    color: theme.palette.success.main,
  });

  const ErrorResponseMessage = styled(ResponseMessage)({
    color: theme.palette.error.main,
  });

  const TagsWrapper = styled(Box)({
    [theme.breakpoints.down("lg")]: {
      position: "relative",
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
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
    width: "100%",
    display: "block",
    marginLeft: "auto",
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
    width: "90%",
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

  const SaveTagsButton = styled(Button)({
    width: "100%",
    padding: theme.spacing(1),
  });

  const SpecificationHeader = styled(Box)({
    width: "50%",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
  });

  const TagNote = styled(Typography)({
    display: "block",
    fontWeight: 500,
  });

  const TagWord = styled(Typography)({
    display: "inline",
    fontWeight: 500,
    marginRight: theme.spacing(1),
  });

  const SectionHeading = styled(Typography)({});

  return (
    <Paper sx={{ padding: 2, marginTop: theme.spacing(2) }}>
      <SectionHeading variant="h6" gutterBottom>
        EDIT PRODUCT INFO
      </SectionHeading>
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
        <InputBox sx={{ marginTop: 3.5 }}>
          <Grid container spacing={3} sx={{ textAlign: "center" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SectionHeading variant="h6" sx={{ marginBottom: 1.5 }}>
                CHANGE CATEGORY:
              </SectionHeading>
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
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SectionHeading variant="h6" sx={{ marginBottom: 1.5 }}>
                CHANGE SUBCATEGORY:
              </SectionHeading>
              <select
                style={StyledSelect}
                name="subcategory"
                defaultValue={productSubcategoryId}
                ref={productSubcategoryRef}
              >
                {subcategories?.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
            </Grid>
          </Grid>
        </InputBox>
        <Box sx={{ marginTop: theme.spacing(5) }}>
          <Box sx={{ display: "block" }}>
            <InputBox>
              <Typography variant="h6">Guarantee:</Typography>
              {
                <StyledFormControlLabel
                  onChange={handleProductHasGuarantee}
                  inputRef={productGuaranteeRef}
                  control={
                    productHasGuarantee ? <Switch defaultChecked /> : <Switch />
                  }
                  label={productHasGuarantee ? "Yes" : "No"}
                />
              }
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Currency:</Typography>
              <ProductInfoInput
                inputRef={productCurrencyRef}
                defaultValue={productCurrency.toString()}
                placeholder={productCurrency.toString()}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Price:</Typography>
              <ProductInfoInput
                type="number"
                inputRef={productPriceRef}
                defaultValue={productPrice.toString()}
                placeholder={productPrice.toString()}
                inputProps={{
                  step: "0.01",
                }}
              />
            </InputBox>
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Discount (in %):</Typography>
              <ProductInfoInput
                type="number"
                inputRef={productDiscountRef}
                defaultValue={productDiscount.toString()}
                placeholder={productDiscount.toString()}
                inputProps={{
                  step: "0.1",
                }}
              />
            </InputBox>
            <InputBox sx={{ width: "50%" }}>
              <Typography variant="h6">Quantity:</Typography>
              <ProductInfoInput
                type="number"
                inputRef={productQuantityRef}
                defaultValue={productQuantity.toString()}
                placeholder={productQuantity.toString()}
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
        <Box>
          <SectionHeading
            variant="h6"
            gutterBottom
            component="div"
            sx={{ marginTop: theme.spacing(6) }}
          >
            SPECIFICATIONS
          </SectionHeading>
          <Box sx={{ padding: 2 }}>
            <Box sx={{ display: "flex" }}>
              <SpecificationHeader>Specification key</SpecificationHeader>
              <SpecificationHeader>Specification value</SpecificationHeader>
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
              onClick={setValuesToStates}
              size="small"
              variant="contained"
              color="secondary"
            >
              Save Specification
            </AddSpecificationButton>
          </Box>
        </Box>
        <Box sx={{ marginLeft: theme.spacing(4) }}>
          <TagsWrapper>
            <TagWord>Tags:</TagWord>
            {productTags.map((tag, index) => (
              <StyledChip key={index} label={tag} color="warning"></StyledChip>
            ))}
            <IconButton color="secondary" onClick={handleTagsInput}>
              {tagsInput ? <RemoveCircle /> : <AddCircle />}
            </IconButton>
          </TagsWrapper>
          <Collapse in={tagsInput}>
            <InputBox>
              <TagNote>(tags separated by comma)</TagNote>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={9} lg={10}>
                  <ProductInfoInput
                    sx={{
                      marginTop: 0,
                      padding: 1,
                    }}
                    inputRef={productTagsRef}
                    multiline
                    defaultValue={productTags.join(", ")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <SaveTagsButton
                    onClick={setValuesToStates}
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    save tags
                  </SaveTagsButton>
                </Grid>
              </Grid>
            </InputBox>
          </Collapse>
        </Box>
        <Box>
          <SectionHeading
            variant="h6"
            gutterBottom
            sx={{ marginTop: theme.spacing(4) }}
          >
            PRODUCT IMAGES
          </SectionHeading>
          <StyledImageList cols={5}>
            {productImages?.map((item, index) => (
              <StyledImageListItem key={index}>
                <ListItemIcon
                  sx={{ position: "absolute", zIndex: 1, right: -15 }}
                >
                  <IconButton>
                    <Close color="error" />
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
        </Box>
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
