import { React, Fragment, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ApiEndpoints, apiUrl } from "../../api/endpoints";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(ApiEndpoints.users.getAll, {
          signal: controller.signal,
        });
        console.log(response.data);

        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
       // navigate("/login", { state: { from: location }, replace: true }); 
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Fragment>
      <Box>
        <Typography variant="h4">Users List</Typography>
        {users?.length ? (
          <Box>
            {users.map((user, i) => (
                <Box key={i}>
                     <p>{user?.id}</p>
                     <p>{user?.email}</p>
                     <p>{user?.username}</p>
                     <p>{user?.createdOn}</p>
                </Box>  
            ))}
          </Box>
        ) : (
          <p>No users to display</p>
        )}
      </Box>
    </Fragment>
  );
}
