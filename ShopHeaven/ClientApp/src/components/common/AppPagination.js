import { React } from "react";
import { Pagination } from "@mui/material";

const AppPagination = ({ setPage, numberOfPages, page }) => {
  const handleChange = (page) => {
    if (page < 1) {
      page = 1;
    }

    setPage(Number(page));
    window.scroll(0, 0);
  };

  return (
    <Pagination
      page={page}
      onChange={(e) => handleChange(e.target.textContent)}
      count={numberOfPages}
      size="medium"
      color="secondary"
    />
  );
};

export default AppPagination;
