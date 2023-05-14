import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../api/endpoints";
import {
  Box,
  Button,
  TableRow,
  TableCell,
  Collapse,
  Table,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { AddCircle } from "@mui/icons-material";
import CreateCategory from "./CreateCategory";
import AdminCategoriesRow from "./AdminCategoriesRow";

export default function AdminCategories(props) {

  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);

  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const effectRun = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get(ApiEndpoints.categories.getAll, {
          signal: controller.signal,
        });
        console.log(response.data);

        setCategories(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true }); 
      }
    };

    if (effectRun.current) {
      getCategories();
    }

    return () => {
      controller.abort();
      effectRun.current = true; // update the value of effectRun to true
    };
  }, []);

  function handleOpen() {
    setOpenCreateCategoryModal(!openCreateCategoryModal);
  } 

  const MainCategoryTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  });

  return (
    <Box>
      <TableContainer component={Box}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <MainCategoryTableCell>CATEGORY</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                PRODUCTS
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                SUBCATEGORIES
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                CREATOR
              </MainCategoryTableCell>
              <MainCategoryTableCell align="center">EDIT</MainCategoryTableCell>
              <MainCategoryTableCell align="center">
                DELETE
              </MainCategoryTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category, index) => {
              return (
                <AdminCategoriesRow
                  key={index}
                  category={category}
                  subcategories={category?.subcategories}
                />
              );
            })}
          </TableBody>
        </Table>
        <StyledButtonBox>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="small"
            startIcon={<AddCircle />}
          >
            ADD NEW CATEGORY
          </Button>
        </StyledButtonBox>
      </TableContainer>  
       <Collapse in={openCreateCategoryModal} timeout="auto" unmountOnExit>
          <CreateCategory/>
       </Collapse>
    </Box>
  );
}