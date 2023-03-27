import {  Box, Grid, Typography,  List,  ListItem,  Divider,  Link, } from "@mui/material";
  import { LinkedIn, GitHub, } from "@mui/icons-material";
  import { styled } from "@mui/material/styles";
  import { theme } from "./../../theme";
import Sidebar from "./Sidebar";
import CategoryProducts from "./CategoryProducts";
  
  export default function SidebarWithProducts(props) {
    return (
        <div>

<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={0} sm={0} md={4} lg={3} sx={{border: "1px solid blue"}}>
        <Sidebar/>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} sx={{border: "1px solid blue"}}>
        <CategoryProducts/>
        </Grid>
      </Grid>
    </Box>

   </div>
    );
  }
  