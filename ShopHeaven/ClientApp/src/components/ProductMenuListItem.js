import { React, useState } from "react";
import {
  Box,
  ListItemButton,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@mui/material";

import { theme } from "../theme";
import {
  AddShoppingCart,
  Image,
  Delete,
} from "@mui/icons-material";


export default function ProductMenuListItem(props) {
  const [deleteItem, setDeleteItem] = useState(false);

  return (
    deleteItem == true ? <div></div> : 
   <Box sx={{ display: "flex" }}>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar>
          <Image />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={`Price: ${props.price}`} />
    </ListItemButton>
    <ListItemButton
      sx={{
        cursor: "pointer",
        color: theme.palette.success.main,
        paddingTop: theme.spacing(3.5),
        paddingBottom: theme.spacing(3.5),
      }}
    >
      <AddShoppingCart />
    </ListItemButton>
    <ListItemButton
      sx={{
        cursor: "pointer",
        color: theme.palette.error.main,
        paddingTop: theme.spacing(3.5),
        paddingBottom: theme.spacing(3.5),
      }}
      onClick = {()=> props.deleteProductFromList()}
    >
      <Delete />
    </ListItemButton>
  </Box>
 
  );
}