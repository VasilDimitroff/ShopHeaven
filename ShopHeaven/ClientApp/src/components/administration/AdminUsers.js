import { React, Fragment, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { getAll } from "../../services/admin/usersService";
import useRefreshToken from "../../hooks/useRefreshToken";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

export default function AdminUsers() {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await getAll(controller);
        isMounted && setUsers(response.data);
      } catch(error) {
        console.log(error)
      }
    }

    getUsers()

    return () => {
       isMounted = false;
       controller.abort();
    }
  }, []);

  return (
    <Fragment>
      <Box>
        <h2>Users</h2>
        {}
        {users?.length ? (
          <div>
            {users.map((user, index) => {
              <p key={index}>Email{user?.email}</p>;
            })}
          </div>
        ) : (
         <Typography>No users to display</Typography>
        )}
      </Box>
    </Fragment>
  );
}
