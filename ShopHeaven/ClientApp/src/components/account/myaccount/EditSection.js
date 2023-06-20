import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Alert,
	Paper,
	Typography,
	Stack,
	Zoom,
	Divider,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ApiEndpoints } from "../../../api/endpoints";
import {
	InputBox,
	UniversalInput,
	CompleteActionButton,
	SubheadingChip,
} from "../../../styles/styles";
import { theme } from "../../../theme";
import {
	usernameRequiredLength,
	passwordRequiredLength,
	noPermissionsForOperationMessage,
} from "../../../constants";

export default function EditSection(props) {
	const [myUser, setMyUser] = useState(props.myUser);

	const { setAuth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const userNameRef = useRef();
	const userEmailRef = useRef();
	const userOldPasswordRef = useRef();
	const userNewPasswordRef = useRef();
	const userNewPasswordAgainRef = useRef();

	//errors
	const [messages, setMessages] = useState({
		userNameError: "",
		userEmailError: "",
		userNewPasswordsError: "",
	});

	const [editUserResponseMessage, setEditUserResponseMessage] = useState("");
	const [editUserErrorMessage, setEditUserErrorMessage] = useState("");

	const [changePasswordResponseMessage, setChangePasswordResponseMessage] =
		useState("");
	const [changePasswordErrorMessage, setChangePasswordErrorMessage] =
		useState("");

	useEffect(() => {
		setMyUser(props.myUser);
	}, [props.myUser, myUser]);

	function onEditUser(e) {
		e.preventDefault();

		setValuesToStates();

		let isFormValid = validateUserDataForm();

		if (!isFormValid) {
			return;
		}

		const editedUser = {
			id: myUser.id,
			username: userNameRef.current.value.trim(),
			email: userEmailRef.current.value.trim(),
		};

		editUser(editedUser);
	}

	async function editUser(editedUser) {
		try {
			const controller = new AbortController();

			const response = await axiosPrivate.post(
				ApiEndpoints.users.editUser,
				editedUser,
				{
					signal: controller.signal,
				}
			);

			controller.abort();

			console.log("RES", response?.data);
			props.updatedUser();

			setEditUserErrorMessage("");
			setEditUserResponseMessage(`Profile updated successfully`);
		} catch (error) {
			setEditUserResponseMessage("");

			if (error?.response?.status === 401 || error?.response?.status === 403) {
				setEditUserErrorMessage(noPermissionsForOperationMessage);
			} else {
				setEditUserErrorMessage(error?.response?.data);
			}
			console.log(error?.message);
		}
	}

	function validateUserDataForm() {
		let isValid = true;
		let errors = [];

		if (userNameRef.current.value.length < usernameRequiredLength) {
			let msg = `Username must contain at least ${usernameRequiredLength} characters`;
			errors.push(msg);

			setMessages((prev) => {
				return {
					...prev,
					userNameError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					userNameError: "",
				};
			});
		}

		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (!userEmailRef.current.value.match(mailformat)) {
			let msg = "Please enter valid email format!";
			errors.push(msg);

			setMessages((prev) => {
				return {
					...prev,
					userEmailError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					userEmailError: "",
				};
			});
		}

		return isValid;
	}

	function onChangePassword(e) {
		e.preventDefault();

		setValuesToStates();

		let isFormValid = validateChangePasswordForm();

		if (!isFormValid) {
			return;
		}

		const changePasswordModel = {
			userId: myUser.id,
			oldPassword: userOldPasswordRef.current.value.trim(),
			newPassword: userNewPasswordRef.current.value.trim(),
			confirmNewPassword: userNewPasswordAgainRef.current.value.trim(),
		};

		changePassword(changePasswordModel);
	}

	async function changePassword(changePasswordModel) {
		try {
			const controller = new AbortController();

			const response = await axiosPrivate.post(
				ApiEndpoints.auth.changePassword,
				changePasswordModel,
				{
					signal: controller.signal,
				}
			);

			controller.abort();

			console.log("CHANGE PASSWORD RESPONSE", response?.data);

			deleteAuthData();
			//props.updatedUser();

			setChangePasswordErrorMessage("");
			setChangePasswordResponseMessage(`Password updated successfully`);

			navigate("/");
		} catch (error) {
			setChangePasswordResponseMessage("");

			if (error?.response?.status === 401 || error?.response?.status === 403) {
				setChangePasswordErrorMessage(noPermissionsForOperationMessage);
			} else {
				setChangePasswordErrorMessage(error?.response?.data);
			}
			console.log(error?.message);
		}
	}

	function deleteAuthData() {
		setAuth({});
	}

	function validateChangePasswordForm() {
		let isValid = true;
		let errors = [];

		if (
			userNewPasswordRef.current.value.length < passwordRequiredLength ||
			userNewPasswordAgainRef.current.value < passwordRequiredLength
		) {
			let msg = `Password must contain at least ${passwordRequiredLength} characters`;
			errors.push(msg);

			setMessages((prev) => {
				return {
					...prev,
					userNewPasswordsError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					userNewPasswordsError: "",
				};
			});
		}

		if (
			userNewPasswordAgainRef.current.value !== userNewPasswordRef.current.value
		) {
			let msg = `Passwords must match!`;
			errors.push(msg);

			setMessages((prev) => {
				return {
					...prev,
					userNewPasswordsError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					userNewPasswordsError: "",
				};
			});
		}

		return isValid;
	}

	function setValuesToStates() {
		setMyUser((prev) => {
			return {
				...prev,
				username: userNameRef.current.value,
				email: userEmailRef.current.value,
			};
		});
	}

	return (
		<Paper sx={{ p: 2 }}>
			<Stack spacing={3}>
				<Divider>
					<SubheadingChip
						label={"EDIT INFO"}
						variant="outlined"
						color="primary"
					/>
				</Divider>
				<Box>
					<form component="form" onSubmit={onEditUser}>
						<InputBox>
							<UniversalInput
								label={"Email"}
								inputRef={userEmailRef}
								placeholder={myUser.email}
								defaultValue={myUser.email}
							/>
							{messages.userEmailError ? (
								<Alert variant="filled" severity="error">
									{messages.userEmailError}
								</Alert>
							) : (
								<></>
							)}
						</InputBox>
						<InputBox>
							<UniversalInput
								label={"Username"}
								inputRef={userNameRef}
								placeholder={myUser.username}
								defaultValue={myUser.username}
							/>
							{messages.userNameError ? (
								<Alert variant="filled" severity="error">
									{messages.userNameError}
								</Alert>
							) : (
								<></>
							)}
						</InputBox>
						<InputBox>
							<CompleteActionButton
								color="secondary"
								startIcon={<Edit />}
								type="submit"
								size="big"
								variant="contained"
							>
								EDIT USER
							</CompleteActionButton>
						</InputBox>
					</form>
					<Box>
						{editUserResponseMessage ? (
							<Zoom in={editUserResponseMessage.length > 0 ? true : false}>
								<Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
									{editUserResponseMessage}
								</Alert>
							</Zoom>
						) : (
							""
						)}
						{editUserErrorMessage ? (
							<Zoom in={editUserErrorMessage.length > 0 ? true : false}>
								<Alert
									variant="filled"
									sx={{ marginTop: theme.spacing(1) }}
									severity="error"
								>
									{editUserErrorMessage}
								</Alert>
							</Zoom>
						) : (
							""
						)}
					</Box>
				</Box>
				<Divider>
					<SubheadingChip
						label={"CHANGE PASSWORD"}
						variant="outlined"
						color="primary"
					/>
				</Divider>
				<Box>
					<form component="form" onSubmit={onChangePassword}>
						<InputBox>
							<UniversalInput
								label={"Enter old password"}
								inputRef={userOldPasswordRef}
								placeholder={"Enter old password"}
								type="password"
							/>
						</InputBox>
						<InputBox>
							<UniversalInput
								label={"Enter new password"}
								inputRef={userNewPasswordRef}
								placeholder={"Enter new password"}
								type="password"
							/>
						</InputBox>
						<InputBox>
							<UniversalInput
								label={"Confirm new password"}
								inputRef={userNewPasswordAgainRef}
								placeholder={"Confirm new password"}
								type="password"
							/>
						</InputBox>
						<InputBox>
							{messages.userNewPasswordsError ? (
								<Alert variant="filled" severity="error">
									{messages.userNewPasswordsError}
								</Alert>
							) : (
								<></>
							)}
						</InputBox>
						<InputBox>
							<CompleteActionButton
								color="secondary"
								startIcon={<Edit />}
								type="submit"
								size="big"
								variant="contained"
							>
								CHANGE PASSWORD
							</CompleteActionButton>
						</InputBox>
					</form>
					<Box>
						{changePasswordResponseMessage ? (
							<Zoom
								in={changePasswordResponseMessage.length > 0 ? true : false}
							>
								<Alert sx={{ marginTop: theme.spacing(1) }} severity="success">
									{changePasswordResponseMessage}
								</Alert>
							</Zoom>
						) : (
							""
						)}
						{changePasswordErrorMessage ? (
							<Zoom in={changePasswordErrorMessage.length > 0 ? true : false}>
								<Alert
									variant="filled"
									sx={{ marginTop: theme.spacing(1) }}
									severity="error"
								>
									{changePasswordErrorMessage}
								</Alert>
							</Zoom>
						) : (
							""
						)}
					</Box>
				</Box>
			</Stack>
		</Paper>
	);
}
