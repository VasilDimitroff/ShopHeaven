import { React } from "react";
import { Pagination } from "@mui/material";

const AppPagination = ({ setPage, numberOfPages, page, scroll }) => {
	const handleChange = (page) => {
		if (page < 1) {
			page = 1;
		}

		setPage(Number(page));

		if (scroll) {
			window.scroll(0, 0);
		}
	};

	return (
		<Pagination
			page={page}
			onChange={(e) => handleChange(e.target.textContent)}
			count={numberOfPages}
			size="medium"
			color="primary"
			hideNextButton
		/>
	);
};

export default AppPagination;
