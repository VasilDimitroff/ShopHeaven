import { React, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";

export default function AdminUsers() {
  const [users, setUsers] = useState();

  return (
    <Fragment>
      <Box>
        <h2>Users</h2>
        {users?.length ? (
          <ul>
            {users.map((user, index) => {
              <li key={index}>{user?.email}</li>;
            })}
          </ul>
        ) : (
         <Typography>No users to display</Typography>
        )}
      </Box>
    </Fragment>
  );
}
