import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
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
import { theme } from "../../../theme";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import Loader from "../../common/Loader";
import CreateCategory from "./CreateCategory";
import AdminCategoriesRow from "./AdminCategoriesRow";

export default function AdminCategories() {
  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const effectRun = useRef(false);

  function categoriesListChanged(newCategory) {
    setCategories((prev) => {
      return [...prev, newCategory];
    });
    console.log(newCategory);
  }

  useEffect(() => {
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          ApiEndpoints.categories.getAll,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);

        setCategories(response.data);
        setIsLoading(false);
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
    marginLeft: theme.spacing(1),
  });

  return (
    <Box>
      {isLoading ? <Box sx={{padding: theme.spacing(3)}}><Loader/></Box> : <></>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "20px",
                  padding: 0,
                  paddingLeft: theme.spacing(1),
                }}
              ></TableCell>
              <MainCategoryTableCell>CATEGORY</MainCategoryTableCell>
              <MainCategoryTableCell align="center"></MainCategoryTableCell>
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
          {openCreateCategoryModal ? (
            <Button
              onClick={handleOpen}
              variant="contained"
              size="small"
              startIcon={<RemoveCircle />}
            >
              HIDE CREATION FORM
            </Button>
          ) : (
            <Button
              onClick={handleOpen}
              variant="contained"
              size="small"
              startIcon={<AddCircle />}
            >
              ADD NEW CATEGORY
            </Button>
          )}
        </StyledButtonBox>
      </TableContainer>
      <Collapse in={openCreateCategoryModal} timeout="auto" unmountOnExit>
        <CreateCategory categoriesListChanged={categoriesListChanged} />
      </Collapse>
    </Box>
  );
}
