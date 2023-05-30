import { React, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductReviewsList from "./ProductReviewsList";
import AddReviewForm from "./AddReviewForm";
import ProductSpecifications from "./ProductSpecifications";
import { theme } from "../../../theme";

export default function ProductDetailInformation(props) {

  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div hidden={value !== index}>
        {value === index && (
          <StyledTabContent>
            {children}
          </StyledTabContent>
        )}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabContent = styled(Box)({
    padding: theme.spacing(3),
  });

  const MainWrapper = styled(Box)({
    width: "80%",
    margin: "auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  });

  const HeadingTableCell = styled(TableCell)({
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 24,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  });

  const HeadingDescription = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 24,
    paddingTop: theme.spacing(1.9),
    paddingBottom: theme.spacing(3),
  });

  return (
    <MainWrapper>
      <Paper>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <HeadingDescription>PRODUCT DESCRIPTION</HeadingDescription>
            <p>{props.product.description}</p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <HeadingTableCell>SPECIFICATIONS</HeadingTableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ProductSpecifications specifications={props.product.specifications}/>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddReviewForm/>
            <ProductReviewsList reviews={props.product.reviews}/>
          </TabPanel>
        </Box>
      </Paper>
    </MainWrapper>
  );
}