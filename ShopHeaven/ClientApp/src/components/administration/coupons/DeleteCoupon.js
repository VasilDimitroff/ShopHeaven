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
import CreateCoupon from "./CreateCoupon";
import { loginPath } from "../../../constants";
import AdminCouponsRow from "./AdminCouponsRow";

export default function DeleteCoupon() {
  const [openCreateCouponForm, setOpenCreateCouponForm] = useState(false);

  const [coupons, setCoupons] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const effectRun = useRef(false);

  function couponsListChanged(newCoupon) {
    setCoupons((prev) => {
      return [...prev, newCoupon];
    });
    console.log(newCoupon);
  }

  useEffect(() => {
    const controller = new AbortController();

    const getCoupons = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          ApiEndpoints.categories.getAll,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);

        setCoupons(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate(`${loginPath}`, { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getCoupons();
    }
 
    return () => {
      controller.abort();
      effectRun.current = true;
    };
  }, []);

  function handleOpen() {
    setOpenCreateCouponForm(!openCreateCouponForm);
  }

  const CouponTableCell = styled(TableCell)({
    fontSize: 18,
  });

  const StyledButtonBox = styled(Box)({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  });

  return (
    <Box>
        "DELETE"
    </Box>
  );
}
