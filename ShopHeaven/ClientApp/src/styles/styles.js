import { theme } from "../theme"
import { Button, Chip, TextField, Box, Typography, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";


//wrapper for EditProdut, EditUser...
export const AdminMainWrapper = styled(Paper)({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
});


// edit and delete buttons in admin row components
export const ActionIconButton = styled(IconButton)({
  borderWidth: "1.5px",
  borderStyle: "solid",
});

//dropdown menu in admin panel
export const StyledSelect = {
    cursor: "pointer",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2.18,1),
    border: "1px solid #C6BFBE",
    textTransform: "uppercase",
    fontSize: 14,
    marginTop: theme.spacing(1),
  };

  //product editing and product creating
  export const SaveTagsButton = styled(Button)({
    width: "95%", 
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      display: "block",
      margin: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  });

  export const HeadingChip = styled(Chip)({
    fontSize: 21,
    padding: theme.spacing(2),
    fontWeight: 500,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.secondary.main,
  });

  export const SubheadingChip = styled(Chip)({
    fontSize: 12,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  export const StyledChip = styled(Chip)({
    cursor: "pointer",
    textAlign: "left",
    marginRight: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
  });

  // universal input field
  export const ProductInfoInput = styled(TextField)({
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  });

  // universal input box holder
  export const InputBox = styled(Box)({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  });

  //product editing and product creating
  export const TagsWrapper = styled(Box)({
    [theme.breakpoints.down("lg")]: {
      position: "relative",
    },
    marginBottom: theme.spacing(2),
  });

  //for product editing and product creating
  export const AddSpecificationButton = styled(Button)({
    width: "50%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  });

  //for product editing and product creating
  export const CalculatePriceButton = styled(Button)({
    width: "50%",
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  });

  //Edit product, create product, edit user, edit category...
  export const CompleteActionButton = styled(Button)({
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  });

  //product editing and product creating
  export const TagWord = styled(Typography)({
    display: "inline",
    fontWeight: 500,
    marginRight: theme.spacing(1),
  });