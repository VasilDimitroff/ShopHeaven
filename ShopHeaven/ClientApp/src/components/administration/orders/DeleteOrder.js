import { React, useState, Fragment } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
    Alert,
    Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../../theme";
import { Delete, Cancel } from "@mui/icons-material";
import { ApiEndpoints } from "../../../api/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { noPermissionsForOperationMessage } from "../../../constants";

export default function DeleteOrder(props) {
    let axiosPrivate = useAxiosPrivate();

    const [order, setOrder] = useState(props.order);
    const [deleteResponse, setDeleteResponse] = useState(undefined);
    const [deleteOrderResponseMessage, setDeleteOrderResponseMessage] =
        useState("");
    const [deleteOrderErrorMessage, setDeleteOrderErrorMessage] =
        useState("");
    const [isDeleted, setIsDeleted] = useState(false);

    function onDeleteOrder() {
        deleteOrder(order.id);
    }

    async function deleteOrder(orderId) {
        try {
            const controller = new AbortController();

            const response = await axiosPrivate.post(
                ApiEndpoints.orders.deleteOrder,
                JSON.stringify({ id: orderId }),
                {
                    signal: controller.signal,
                }
            );

            controller.abort();

            setDeleteOrderErrorMessage("");
            setDeleteOrderResponseMessage(
                "Order " + order?.id + " deleted!"
            );

            setDeleteResponse(response?.data);
            console.log("RESPONSE DELETED OREDER", response?.data)
            setIsDeleted(true);
            props.updateOrder(response?.data);
        } catch (error) {
            setDeleteOrderResponseMessage("");
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setDeleteOrderErrorMessage(
                    noPermissionsForOperationMessage
                );
            } else {
                setDeleteOrderErrorMessage(error?.response?.data);
            }
            console.log(error.message);
        }
    }

    const DeleteOrderButton = styled(Button)({
        width: "100%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    });

    const ButtonsHolder = styled(Box)({
        display: "flex",
        width: "100%",
        margin: "auto",
        gap: 60,
        justifyContent: "center",
    });

    return (
        <Paper sx={{ padding: theme.spacing(2), marginTop: theme.spacing(2) }}>
            <Fragment>
                <Box
                    sx={{
                        textAlign: "center",
                        marginLeft: theme.spacing(4),
                        marginTop: theme.spacing(3),
                    }}
                >
                    <Typography variant="h6">
                        You are on the way to delete order {order.id}!
                    </Typography>
                    <Typography variant="p" color="error">
                        Be careful!
                    </Typography>
                </Box>
                <ButtonsHolder>
                    <DeleteOrderButton
                        startIcon={<Delete />}
                        onClick={onDeleteOrder}
                        type="submit"
                        size="large"
                        variant="outlined"
                        color="error"
                        disabled={isDeleted ? true : false}
                    >
                        DELETE ORDER
                    </DeleteOrderButton>
                    <DeleteOrderButton
                        startIcon={<Cancel />}
                        onClick={props.onCancelButtonClicked}
                        type="submit"
                        size="large"
                        variant="contained"
                        color="error"
                    >
                        CANCEL
                    </DeleteOrderButton>
                </ButtonsHolder>
                {deleteOrderResponseMessage ? (
                    <Zoom in={deleteOrderResponseMessage.length > 0 ? true : false}>
                        <Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
                            {deleteOrderResponseMessage}
                        </Alert>
                    </Zoom>
                ) : (
                    ""
                )}
                {deleteOrderErrorMessage ? (
                    <Zoom in={deleteOrderErrorMessage.length > 0 ? true : false}>
                        <Alert variant="filled" sx={{ marginTop: theme.spacing(1) }} severity="error">
                            {deleteOrderErrorMessage}
                        </Alert>
                    </Zoom>
                ) : (
                    ""
                )}
            </Fragment>
        </Paper>
    );
}
