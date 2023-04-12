import { React, useState, Fragment, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  MenuItem,
  Zoom,
  Backdrop,
  TextField,
  InputAdornment,
  Chip,
  InputBase,
  FormControlLabel,
  Switch,
  ImageList,
  ImageListItem,
  ListItemIcon,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
  Delete,
  AddCircle,
  PhotoCamera,
} from "@mui/icons-material";
import axios from "axios";
import { ApiEndpoints } from "../../endpoints";

export default function CreateProduct() {

  const categories = [
    {
      id: '1',
      name: 'Home and Garden',
    },
    {
      id: '2',
      name: 'Gaming',
    },
    {
      id: '3',
      name: 'Laptops and tablets',
    },
    {
      id: '4',
      name: 'Car',
    },
  ];

  const [productAvailable, setProductAvailable] = useState(
    true
  );

  const [productHasGuarantee, setProductHasGuarantee] = useState(
    true
  );

  useEffect(() => {
    console.log("productAvailable has been updated:", productAvailable);
  }, [productAvailable]);

  useEffect(() => {
    console.log("productHasGuarantee has been updated:", productHasGuarantee);
  }, [productHasGuarantee]);

  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productAvailabilityRef = useRef();

  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState(false);

  function onChangeAvailability(e) {
    setProductAvailable(!productAvailable);
    console.log("AVAILABLE: " + productAvailabilityRef.current.checked);
  }

  function handleProductHasGuarantee(e) {
    setProductHasGuarantee(!productHasGuarantee);
    console.log("HAS GUARANTEE: " + productAvailabilityRef.current.checked);
  }

  function clearFormValues() {
    productNameRef.current.value = "";
    productDescriptionRef.current.value = "";
    document.getElementById("edit-product-image").value = "";
  }

  const InputBox = styled(Box)({

  });

  const EditProductButton = styled(Button)({
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
    width: "100%"
  });

  return (
    <Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 2 }}>
                  <Typography variant="h4" sx={{textAlign: "center"}} gutterBottom>
                    CREATE NEW PRODUCT
                  </Typography>
                  <form component="form">
                    <InputBox>
                      <ProductInfoInput
                        sx={{ fontSize: 24 }}
                        inputRef={productNameRef}
                        placeholder="Product name"
                      />
                    </InputBox>
                    <InputBox>
                      <ProductInfoInput
                        inputRef={productNameRef}
                        placeholder="Brand"
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
                    <Box sx={{display: "flex", gap: 10, marginTop: theme.spacing(5)}}>
                    <InputBox>
                      <TextField
                        id="filled-select-category"
                        select
                        defaultValue={categories[0].name}
                        helperText="Please select main category"
                        variant="standard"
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputBox>

                    <InputBox>
                      <TextField
                        id="filled-select-subcategory"
                        select
                        defaultValue={categories[0].name}
                        helperText="Please select subcategory"
                        variant="standard"
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputBox>
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
                          inputRef={productNameRef}
                          placeholder={0}
                        />
                      </InputBox>
                      <InputBox>
                        <Typography variant="h6">Currency:</Typography>
                        <ProductInfoInput
                          inputRef={productNameRef}
                          placeholder="$"
                        />
                      </InputBox>
                      <InputBox>
                        <Typography variant="h6">Price:</Typography>
                        <ProductInfoInput
                          inputRef={productNameRef}
                          placeholder={0.0}
                        />
                      </InputBox>
                      <InputBox>
                        <Typography variant="h6">Discount:</Typography>
                        <ProductInfoInput
                          inputRef={productNameRef}
                          placeholder={`${0}%`}
                        />
                      </InputBox>
                      <InputBox>
                        <Typography variant="h6" color="error">
                          Final Price:
                        </Typography>
                        <ProductInfoInput
                          disabled
                          inputRef={productNameRef}
                          placeholder=""
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
                    <EditProductButton
                      type="submit"
                      size="medium"
                      variant="contained"
                    >
                      SAVE PRODUCT INFO
                    </EditProductButton>
                  </form>
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      sx={{ marginTop: theme.spacing(6) }}
                    >
                      PRODUCT IMAGES
                    </Typography>
                    <form>
                      <InputBox>
                        <ProductInfoInput
                          accept=".jpg, .png"
                          type="file"
                          variant="outlined"
                          id="upload-product-photos-image"
                          inputProps={{
                            multiple: true,
                          }}
                        />
                      </InputBox>
                      <EditProductButton
                        type="submit"
                        size="medium"
                        variant="contained"
                      >
                        SAVE IMAGES
                      </EditProductButton>
                    </form>
                  </Box>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <ResponseMessage>{editProductResponseMessage}</ResponseMessage>
      {editProductErrorMessage ? (
        <ErrorResponseMessage>
          An error during product editing!
        </ErrorResponseMessage>
      ) : (
        ""
      )}
    </Fragment>
  );
}
