import { React, useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Chip,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductReviews from "./ProductReviews";
import AddReviewForm from "./AddReviewForm";
import ProductSpecifications from "./ProductSpecifications";
import { theme } from "../../../theme";

export default function ProductDetailInfo(props) {
  const [product, setProduct] = useState(props.product);

  useEffect(()=> {
    setProduct(props.product)
  }, [props.product])

  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div hidden={value !== index}>
        {value === index && <StyledTabContent>{children}</StyledTabContent>}
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

  const DetailsHeading = styled(Box)({
    textAlign: "center",
    marginTop: theme.spacing(1.9),
    marginBottom: theme.spacing(3),
  });

  const HeadingChip = styled(Chip)({
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    paddingTop: theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2.5),
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
            <DetailsHeading>
              <Divider>
                <HeadingChip
                  color="primary"
                  label={"PRODUCT DESCRIPTION"}
                ></HeadingChip>
              </Divider>
            </DetailsHeading>
            <p>{product.description}</p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DetailsHeading>
              <Divider>
                <HeadingChip
                  color="primary"
                  label={"SPECIFICATIONS"}
                ></HeadingChip>
              </Divider>
            </DetailsHeading>
            <TableContainer>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ProductSpecifications
                    specifications={product?.specifications}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DetailsHeading>
              <Divider>
                <HeadingChip color="primary" label={"REVIEWS"}></HeadingChip>
              </Divider>
            </DetailsHeading>
            <ProductReviews reviews={product?.reviews} productId={product?.id} />
          </TabPanel>
        </Box>
      </Paper>
    </MainWrapper>
  );
}
