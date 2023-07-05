import { useState, useRef } from "react";
import {
	Box,
	Container,
	TextField,
	Typography,
	Button,
	InputAdornment,
	Paper,
	Alert,
} from "@mui/material";
import { Person, Email } from "@mui/icons-material";
import { theme } from "../../theme";
import { styled } from "@mui/material/styles";
import { MainWrapper } from "../../styles/styles";
import axios from "../../api/axios";
import { ApiEndpoints } from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";

function SubscribeForm(props) {
	const { auth } = useAuth();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const nameRef = useRef();
	const emailRef = useRef();

	//errors
	const [messages, setMessages] = useState({
		nameError: "",
		emailError: "",
		successSubscribing: "",
		errorSubscribing: "",
	});

	function onSubmitForm(e) {
		e.preventDefault();

		console.log(emailRef.current.value);
		console.log(nameRef.current.value);

		setName(nameRef.current.value);
		setEmail(emailRef.current.value);

		if (!validateUserDataForm()) {
			return;
		}

		const requestData = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			userId: auth.userId ?? null,
		};

		subscribeToNewsletter(requestData);
	}

	async function subscribeToNewsletter(requestData) {
		try {
			const controller = new AbortController();

			const response = await axios.post(
				ApiEndpoints.newsletter.subscribe,
				requestData,
				{
					signal: controller.signal,
				}
			);

			controller.abort();

			console.log("SUBSCRIBE RESPONSE", response?.data);

			setMessages((prev) => {
				return {
					...prev,
					successSubscribing: "You successfully subscribed for our newsletter!",
				};
			});

			setName("");
			setEmail("");
		} catch (error) {
			setMessages((prev) => {
				return {
					...prev,
					errorSubscribing: "Error! Subscription failed!",
				};
			});
			console.log(error?.message);
		}
	}

	function validateUserDataForm() {
		let isValid = true;

		if (nameRef.current.value.length < 1) {
			let msg = `Name must contain at least ${1} character`;

			setMessages((prev) => {
				return {
					...prev,
					nameError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					nameError: "",
				};
			});
		}

		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (!emailRef.current.value.match(mailformat)) {
			let msg = "Please enter valid email format!";

			setMessages((prev) => {
				return {
					...prev,
					emailError: msg,
				};
			});

			isValid = false;
		} else {
			setMessages((prev) => {
				return {
					...prev,
					emailError: "",
				};
			});
		}

		return isValid;
	}

	const Info = styled(Typography)({
		textAlign: "center",
		paddingBottom: theme.spacing(4),
		fontSize: "22px",
		[theme.breakpoints.down("md")]: {
			paddingBottom: theme.spacing(0),
		},
	});

	const StyledTextField = styled(TextField)({
		//color: "#ffffff",
		backgroundColor: "rgba(246, 246, 246, 0.7)",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
	});

	const InputsWrapper = styled(Box)({
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing(3),
		[theme.breakpoints.down("md")]: {
			display: "block",
			width: "100%",
			margin: "auto",
		},
	});

	const InputBox = styled(Box)({
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		[theme.breakpoints.down("md")]: {
			marginBottom: theme.spacing(1.5),
		},
	});

	const SubscribeButton = styled(Button)({
		width: "100%",
		display: "block",
		margin: "auto",
		paddingTop: theme.spacing(1.75),
		paddingBottom: theme.spacing(1.75),
	});

	return (
		<MainWrapper>
			<Paper>
				<Box sx={{ pt: 8, pb: 8 }}>
					<Info>{props.infoText}</Info>
					<Container>
						<form onSubmit={onSubmitForm}>
							<InputsWrapper>
								<InputBox>
									<StyledTextField
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Person
														sx={{
															fontSize: "34px",
															pt: theme.spacing(1),
															pb: theme.spacing(1),
														}}
													/>
												</InputAdornment>
											),
										}}
										label="Name"
										variant="outlined"
										defaultValue={name}
										inputRef={nameRef}
										placeholder="Your Name"
									/>
								</InputBox>
								<InputBox>
									<StyledTextField
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Email
														sx={{
															fontSize: "34px",
															pt: theme.spacing(1),
															pb: theme.spacing(1),
														}}
													/>
												</InputAdornment>
											),
										}}
										label="E-mail"
										variant="outlined"
										defaultValue={email}
										inputRef={emailRef}
										placeholder="Your E-mail"
									/>
								</InputBox>
								<InputBox>
									<SubscribeButton
										variant="contained"
										size="large"
										color="secondary"
										type="submit"
									>
										SUBSCRIBE
									</SubscribeButton>
								</InputBox>
							</InputsWrapper>
							{messages.nameError ? (
								<Alert sx={{ mt: 1 }} variant="filled" severity="error">
									{messages.nameError}
								</Alert>
							) : (
								<></>
							)}

							{messages.emailError ? (
								<Alert sx={{ mt: 1 }} variant="filled" severity="error">
									{messages.emailError}
								</Alert>
							) : (
								<></>
							)}

							{messages.successSubscribing ? (
								<Alert sx={{ mt: 1 }} severity="success">
									{messages.successSubscribing}
								</Alert>
							) : (
								<></>
							)}
						</form>
					</Container>
				</Box>
			</Paper>
		</MainWrapper>
	);
}

export default SubscribeForm;
