import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Category } from "@mui/icons-material";
import { theme } from "./../theme";

const Categories = styled(Container)({
  display: "flex",
  flexWrap: "wrap",
  marginTop: 100,
  border: "1px solid black",
  width: 128,
  height: 128,
});

const Wrapper = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  marginTop: theme.spacing(8),
}));

const CategoryItem = styled(ListItemButton)({
  backgroundColor: theme.palette.dropdown.main,
  "&:hover": {
    backgroundColor: theme.palette.onHoverButtonColor.main,
  },
  textTransform: "uppercase",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
});

const categories = [
    {
        name: "Category 1 "
    },
    {
        name: "Category 2"
    },
    {
        name: "Category 3"
    },
    {
        name: "Category 4"
    },
    {
        name: "Category 5"
    },
    {
        name: "Category 6"
    },
    {
        name: "Category 6"
    },
    {
        name: "Category 7"
    },
    {
        name: "Category 8"
    },
    {
        name: "Category 9"
    },

]

export default function HomeSlider() {
  return (
    <Box sx={{ backgroundColor: theme.palette.appBackground.main }}>
      <Wrapper sx={{ border: "1px solid black" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3} lg={2}>
            <Stack spacing={2}>
              <List component="nav" aria-label="mailbox folders">
                {
                    categories.map(category => {
                        return(
                            <Box>
                            
                            <CategoryItem button>
                              <Category />
                              <ListItemText primary={category.name} sx={{marginLeft: theme.spacing(2)}} />
                            </CategoryItem>
                            <Divider />
                            </Box>
                        )
                    })
                }      
              </List>
            </Stack>
          </Grid>
          <Grid item xs={6} md={9} lg={10}>
            <div>xs=6 md=8</div>
          </Grid>
        </Grid>
      </Wrapper>
    </Box>
  );
}
