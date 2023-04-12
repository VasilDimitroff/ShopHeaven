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
  Modal,
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
  Pagination,
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
  const [open, setOpen] = useState(false);

  const [tagsInput, setTagsInput] = useState(false);

  const [productAvailable, setProductAvailable] = useState(
    true
  );

  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productAvailabilityRef = useRef();

  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState(false);

  const [productSpecifications, setProductSpecifications] = useState([{key: "K1", value: "V1"}, {key: "K2", value: "V2"}]);


  useEffect(() => {
    console.log("productSpecifications has been updated:", productSpecifications);
  }, [productSpecifications]);

  function handleSetProductSpecifications(key, value){
    setProductSpecifications((prev) => ([...prev, { key: key, value: value}]));
  }

  function handleTagsInput(show) {
    setTagsInput(show);
  }

  function onChangeAvailability(e) {
    console.log(productAvailabilityRef.current.checked);
    setProductAvailable(!productAvailable);
  }

  function clearFormValues() {
    productNameRef.current.value = "";
    productDescriptionRef.current.value = "";
    document.getElementById("edit-product-image").value = "";
  }

  const ProductNameTableCell = styled(TableCell)({
    fontWeight: 500,
    fontSize: 18,
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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

  const AvailabilityFormControlLabel = styled(FormControlLabel)({
    color: productAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const TagsInputBox = styled(InputBox)({
    display: tagsInput ? "flex" : "none",
  });

  const AddSpecificationButton = styled(Button)({
    width: "30%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
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

  return (
    <Fragment>

<TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                MAIN INFO
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
                <InputBox></InputBox>
                <Box sx={{ display: "flex", marginTop: theme.spacing(5) }}>
                  <InputBox>
                    <Typography variant="h6">Availability:</Typography>
                    <AvailabilityFormControlLabel
                      sx={{
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                      }}
                      inputRef={productAvailabilityRef}
                      onChange={() => onChangeAvailability()}
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
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        display: "block",
                        marginLeft: "auto",
                      }}
                      inputRef={productAvailabilityRef}
                      control={<Switch defaultChecked />}
                      label={"Yes"}
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
                      placeholder={0.00}
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
                      defaultValue={`Specification key-specification value,
Separated-by dash after key,
And comma-after value`}
                    />
                </Box>
                <TagsWrapper>
                  Tags:
                  <IconButton onClick={() => handleTagsInput(!tagsInput)}>
                    <AddCircle />
                  </IconButton>
                  <TagsInputBox>
                    <ProductInfoInput
                      sx={{
                        marginTop: theme.spacing(0),
                        marginLeft: theme.spacing(-2),
                      }}
                      inputRef={productNameRef}
                      multiline
                      defaultValue={`separated, with, comma`}
                    />
                  </TagsInputBox>
                </TagsWrapper>
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
