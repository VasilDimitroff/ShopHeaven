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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Close,
  AddCircle,
  RemoveCircle
} from "@mui/icons-material";
import { theme } from "../../../theme";
import useAxiosPrivateForm from "../../../hooks/useAxiosPrivateForm";
import axios from "../../../api/axios";
import { ApiEndpoints } from "../../../api/endpoints";

export default function EditProduct(props) {
  let productNameRef = useRef();
  let productDescriptionRef = useRef();
  let productImageRef = useRef();
  let productAvailabilityRef = useRef();

  const [editProductResponseMessage, setEditProductResponseMessage] =
    useState("");
  const [editProductErrorMessage, setEditProductErrorMessage] = useState(false);

  const [product, setProduct] = useState(props.product);

  const [tagsInput, setTagsInput] = useState(false);
  const [productAvailable, setProductAvailable] = useState(
    props.product.isAvailable
  );
  const [productSpecifications, setProductSpecifications] = useState([
    ...props.product.specifications,
  ]);

  useEffect(() => {
    console.log(
      "productSpecifications has been updated:",
      productSpecifications
    );
  }, [productSpecifications]);

  function handleSetProductSpecifications(key, value) {
    setProductSpecifications((prev) => [...prev, { key: key, value: value }]);
  }

  function handleTagsInput(show) {
    setTagsInput(show);
  }

  function onChangeAvailability(e) {
    console.log(productAvailabilityRef.current.checked);
    setProductAvailable(!productAvailable);
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
    color: productAvailable
      ? theme.palette.success.main
      : theme.palette.error.main,
    marginTop: theme.spacing(2),
  });

  const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  const TagsInputBox = styled(InputBox)({
    display: tagsInput ? "block" : "none",
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

  return (
    <Paper sx={{ padding: 2, marginTop: theme.spacing(2), border: "2px solid red" }}>
      <Typography variant="h6" gutterBottom component="div">
        EDIT PRODUCT INFO
      </Typography>
      <form component="form">
        <InputBox>
          <ProductInfoInput
            sx={{ fontSize: 24 }}
            inputRef={productNameRef}
            defaultValue={product.name}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            inputRef={productNameRef}
            defaultValue={product.brand}
          />
        </InputBox>
        <InputBox>
          <ProductInfoInput
            multiline
            minRows={4}
            inputRef={productDescriptionRef}
            placeholder={product.description}
            defaultValue={product.description}
          />
        </InputBox>
        <Box sx={{ marginTop: theme.spacing(5) }}>
        <Box sx={{display: "block"}}>
          <InputBox>
            <Typography variant="h6">Guarantee:</Typography>
            <StyledFormControlLabel
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
          </Box>
          <Box sx={{display: "flex"}}>
          <InputBox sx={{width: "50%"}}>
            <Typography variant="h6">Currency:</Typography>
            <ProductInfoInput
              inputRef={productNameRef}
              defaultValue={product.currency}
            />
          </InputBox>
          <InputBox sx={{width: "50%"}}>
            <Typography variant="h6">Price:</Typography>
            <ProductInfoInput
              inputRef={productNameRef}
              defaultValue={product.price}
            />
          </InputBox>
          </Box>
          <Box sx={{display: "flex"}}>
          <InputBox sx={{width: "50%"}}>
            <Typography variant="h6">Discount:</Typography>
            <ProductInfoInput
              inputRef={productNameRef}
              defaultValue={`${product.discount}%`}
            />
          </InputBox>
          <InputBox sx={{width: "50%"}}>
            <Typography variant="h6">Quantity:</Typography>
            <ProductInfoInput
              inputRef={productNameRef}
              defaultValue={product.quantity}
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
                product.price - product.price * (product.discount / 100)
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
            {product.images.map((item, index) => (
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
                  alt={product.name}
                  loading="lazy"
                />
              </StyledImageListItem>
            ))}
          </StyledImageList>
          <InputBox>
            <ProductInfoInput
              inputRef={productImageRef}
              accept=".jpg, .png"
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
          <Box sx={{padding: 2}}>
                <Box sx={{display: "flex"}}>
                  <Box sx={{width: "50%", textAlign: "center"}}>Specification key</Box>
                  <Box sx={{width: "50%", textAlign: "center"}}>Specification value</Box>
                </Box>
                {productSpecifications.map((spec, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex",}}
                  >
                    <Box sx={{width: "50%"}}>
                      <InputBox>
                        <ProductInfoInput defaultValue={spec.key} />
                      </InputBox>
                    </Box>
                    <Box sx={{width: "50%"}}>
                      <InputBox>
                        <ProductInfoInput defaultValue={spec.value} />
                      </InputBox>
                    </Box>
                  </Box>
                ))}
            <AddSpecificationButton
              onClick={() => handleSetProductSpecifications("", "")}
              size="small"
              variant="contained"
            >
              Add Specification
            </AddSpecificationButton>
          </Box>
        </Box>
        <TagsWrapper>
          Tags:
          {product.tags.map((tag, index) => (
            <StyledChip key={index} label={tag} color="secondary"></StyledChip>
          ))}
          <IconButton sx={{color: theme.palette.primary.main}} onClick={() => handleTagsInput(!tagsInput)}>
            { tagsInput ? <RemoveCircle/> : <AddCircle /> }
          </IconButton>  
        </TagsWrapper>
        <Collapse in={tagsInput} unmountOnExit>
        <InputBox>
            <ProductInfoInput
              sx={{
                marginTop: theme.spacing(0),
                marginLeft: theme.spacing(3),
              }}
              inputRef={productNameRef}
              multiline
              defaultValue={`${product.tags.map((tag, index) => {
                return tag;
              })}`}
            />
            <Typography sx={{ display: "block", fontWeight: 500, marginLeft: 3, marginTop: 1 }}>
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