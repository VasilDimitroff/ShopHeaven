import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Typography,
  MenuItem,
  TextField,
  InputBase,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import axios from "../../../api/axios";
import { ApiEndpoints } from "../../../api/endpoints";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [productAvailable, setProductAvailable] = useState(true);
  const [productHasGuarantee, setProductHasGuarantee] = useState(true);

  const [createProductResponseMessage, setCreateProductResponseMessage] =
    useState("");
  const [createProductErrorMessage, setCreateProductErrorMessage] =
    useState("");

  //product creation states
  const [productCategory, setProductCategory] = useState("");
  const [productSubcategory, setProductSubcategory] = useState("");

  //product creation refs
  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productBrandRef = useRef();
  let productCategoryRef = useRef();
  let productSubcategoryRef = useRef();
  let productAvailabilityRef = useRef();
  let productGuaranteeRef = useRef();
  let productQuantityRef = useRef();
  let productCurrencyRef = useRef();
  let productPriceRef = useRef();
  let productDiscountRef = useRef();
  let productTagsRef = useRef();
  let productSpecificationsRef = useRef();

  const effectRun = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axios.get(
          ApiEndpoints.categories.getCategoryNames,
          {
            signal: controller.signal,
          }
        );
        console.log(response?.data);

        setCategories(response?.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
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

  useEffect(() => {
    console.log("productAvailable has been updated:", productAvailable);
  }, [productAvailable]);

  useEffect(() => {
    console.log("productHasGuarantee has been updated:", productHasGuarantee);
  }, [productHasGuarantee]);

  function onChangeAvailability(e) {
    setProductAvailable(!productAvailable);
    console.log("AVAILABLE: " + productAvailabilityRef.current.checked);
  }

  function handleProductHasGuarantee(e) {
    setProductHasGuarantee(!productHasGuarantee);
    console.log("HAS GUARANTEE: " + productAvailabilityRef.current.checked);
  }

  function onProductCreated(e) {
    e.preventDefault();

    const category = productCategoryRef.current.value;
    console.log(category);

    const images = document.getElementById("upload-product-photos-image").files;
    console.log(images);
  }

  function loadSubcategories() {
    const checkedCategory = productCategoryRef.current.value;
    console.log(checkedCategory);
    setProductCategory(checkedCategory);
    setSubcategories(
      (prev) =>
        categories.find(
          (x) => x.name.toLowerCase() === checkedCategory.toLowerCase()
        )?.subcategories
    );
  }

  function clearFormValues() {
    productNameRef.current.value = "";
    productDescriptionRef.current.value = "";
    document.getElementById("edit-product-image").value = "";
  }

  const InputBox = styled(Box)({});

  const CreateProductButton = styled(Button)({
    width: "20%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  });

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

  const AvailabilityFormControlLabel = styled(FormControlLabel)({
    color: productAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const GuaranteeFormControlLabel = styled(FormControlLabel)({
    color: productHasGuarantee
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const TagsInputBox = styled(InputBox)({
    width: "100%",
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
    <Fragment>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 2 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
            CREATE NEW PRODUCT
          </Typography>
          <form component="form" onSubmit={onProductCreated}>
            <InputBox>
              <ProductInfoInput
                sx={{ fontSize: 24 }}
                inputRef={productNameRef}
                type="text"
                placeholder="Product name"
              />
            </InputBox>
            <InputBox>
              <ProductInfoInput
                inputRef={productNameRef}
                placeholder="Brand"
                type="text"
              />
            </InputBox>
            <InputBox>
              <ProductInfoInput
                multiline
                minRows={4}
                inputRef={productDescriptionRef}
                placeholder="Product Description"
              />
            </InputBox>
            <Typography
              sx={{
                marginTop: theme.spacing(5),
                marginBottom: theme.spacing(2),
              }}
              variant="h6"
            >
              SELECT CATEGORY AND SUBCATEGORY:
            </Typography>
            <Box sx={{ display: "flex", gap: 5, width: "100%" }}>
              <select
                style={StyledSelect}
                ref={productCategoryRef}
                name="category"
                onChange={loadSubcategories}
              >
                <option value="" selected disabled hidden>-- SELECT CATEGORY --</option>
                {categories?.map((option) => (
                  <option key={option?.id} value={option?.name}>
                    {option?.name}
                  </option>
                ))}
              </select>

              <select
                style={StyledSelect}
                name="subcategory"
                ref={productSubcategoryRef}
              >
                <option selected disabled hidden>-- SELECT SUBCATEGORY --</option>
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
            <Box sx={{ display: "flex", marginTop: theme.spacing(5), gap: 1 }}>
              <InputBox>
                <Typography variant="h6">Availability:</Typography>
                <AvailabilityFormControlLabel
                  sx={{
                    width: "100%",
                    display: "block",
                    marginLeft: "auto",
                  }}
                  inputRef={productAvailabilityRef}
                  placeholder="KUR"
                  onChange={onChangeAvailability}
                  control={
                    productAvailable === true ? (
                      <Switch defaultChecked />
                    ) : (
                      <Switch />
                    )
                  }
                  label={productAvailable === true ? "Yes" : "No"}
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6">Guarantee:</Typography>
                <GuaranteeFormControlLabel
                  sx={{
                    width: "100%",
                    display: "block",
                    marginLeft: "auto",
                  }}
                  inputRef={productAvailabilityRef}
                  onChange={handleProductHasGuarantee}
                  placeholder="KUR"
                  control={
                    productHasGuarantee === true ? (
                      <Switch defaultChecked />
                    ) : (
                      <Switch />
                    )
                  }
                  label={productHasGuarantee === true ? "Yes" : "No"}
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6">Quantity:</Typography>
                <ProductInfoInput
                  type="number"
                  inputRef={productNameRef}
                  placeholder="{0}"
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6">Currency:</Typography>
                <ProductInfoInput
                  type="text"
                  inputRef={productNameRef}
                  placeholder="$"
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6">Price:</Typography>
                <ProductInfoInput
                  inputRef={productNameRef}
                  type="number"
                  step="0.01"
                  placeholder="{0}"
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6">Discount:</Typography>
                <ProductInfoInput
                  type="number"
                  step="0.01"
                  inputRef={productNameRef}
                  placeholder="{0}"
                />
              </InputBox>
              <InputBox>
                <Typography variant="h6" color="error">
                  Final Price:
                </Typography>
                <ProductInfoInput
                  disabled
                  type="number"
                  step="0.01"
                  inputRef={productNameRef}
                  placeholder={0}
                />
              </InputBox>
            </Box>
            <Box>
              <InputBox sx={{ marginTop: theme.spacing(5) }}>
                <Typography variant="h6">UPLOAD PRODUCT IMAGES:</Typography>
                <ProductInfoInput
                  accept=".jpg, .png"
                  required
                  type="file"
                  variant="outlined"
                  id="upload-product-photos-image"
                  inputProps={{
                    multiple: true,
                  }}
                />
              </InputBox>
            </Box>
            <TagsWrapper>
              Tags:
              <TagsInputBox>
                <ProductInfoInput
                  sx={{
                    marginTop: theme.spacing(0),
                  }}
                  inputRef={productNameRef}
                  type="text"
                  multiline
                  placeholder={`separated, with, comma`}
                />
              </TagsInputBox>
            </TagsWrapper>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ marginTop: theme.spacing(6) }}
              >
                SPECIFICATIONS
              </Typography>
              <ProductInfoInput
                sx={{
                  marginTop: theme.spacing(0),
                  marginLeft: theme.spacing(-2),
                }}
                inputRef={productNameRef}
                minRows={5}
                multiline
                placeholder={`Specification key-specification value,
Separated by dash-after key,
And by comma-after value`}
              />
            </Box>
            <CreateProductButton
              type="submit"
              size="medium"
              variant="contained"
            >
              CREATE PRODUCT
            </CreateProductButton>
          </form>
        </Box>
      </Collapse>

      <ResponseMessage>{createProductResponseMessage}</ResponseMessage>
      {createProductErrorMessage ? (
        <ErrorResponseMessage>
          An error during product editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}
