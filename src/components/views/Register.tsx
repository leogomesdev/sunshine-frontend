import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import AppRegistration from "@mui/icons-material/AppRegistration";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import Alert from "../shared/Alert";
import AuthContext from "../../auth/AuthContext";
import Constants from "../../configs/Constants";
import { registerRequest } from "../../services/api/AuthApiClient";
import IRegisterResponse from "../../services/interfaces/IRegisterResponse";

const Register: React.FC = () => {
  const { handleLogin } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [error, setError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  function validatePasswordInput(password: string) {
    return {
      length: Constants.regex.password.length.test(password),
      uppercase: Constants.regex.password.uppercase.test(password),
      number: Constants.regex.password.number.test(password),
      specialChar: Constants.regex.password.specialChar.test(password),
    };
  }

  const navigate: NavigateFunction = useNavigate();

  function validateName(): boolean {
    if (name.trim() === "") {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  }

  function validateEmail(): boolean {
    if (email === "") {
      setEmailError("Email is required");
      return false;
    }
    if (!Constants.regex.email.test(email)) {
      setEmailError("Email is not valid");
      return false;
    }
    setEmailError("");
    return true;
  }

  function validatePassword(): boolean {
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    }
    if (!Constants.regex.password.general.test(password)) {
      setPasswordError("Password is not valid");
      return false;
    }
    setPasswordError("");
    return true;
  }

  function validatePasswordConfirmation(): boolean {
    if (passwordConfirmation === "") {
      setPasswordConfirmationError("Password Confirmation is required");
      return false;
    }
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError(
        "Password Confirmation must match the Password field"
      );
      return false;
    }
    setPasswordConfirmationError("");
    return true;
  }

  function validateFormData(): boolean {
    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();
    const passwordConfirmationIsValid = validatePasswordConfirmation();
    return (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordConfirmationIsValid
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validateFormData()) {
      return;
    }

    registerRequest(name, email, password, passwordConfirmation)
      .then((response: IRegisterResponse) => {
        if (!response?.data?.token) {
          setError("Error while communicating with the API");
          return;
        }
        setError("");
        localStorage.setItem("authToken", response.data.token);
        handleLogin();
        navigate("/");
      })
      .catch((error: any) => {
        if (["404", "500"].includes(error?.response?.status)) {
          setError(error.message);
          return;
        }
        setError(error.response?.data?.message || error?.message);
      });
  };

  const closeAlert = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AppRegistration />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={nameError !== ""}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value.trim())}
                error={emailError !== ""}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordValidation(
                    validatePasswordInput(event.target.value)
                  );
                }}
                error={passwordError !== ""}
                helperText={passwordError}
              />
              <FormHelperText>
                {passwordValidation.length ? "✓" : "•"} At least 12 characters
              </FormHelperText>
              <FormHelperText>
                {passwordValidation.uppercase ? "✓" : "•"} At least one
                uppercase letter
              </FormHelperText>
              <FormHelperText color="{passwordValidation.number ? 'red'}">
                {passwordValidation.number ? "✓" : "•"} At least one number
              </FormHelperText>
              <FormHelperText>
                {passwordValidation.specialChar ? "✓" : "•"} At least one
                special character
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                label="Re-enter your password"
                type="password"
                id="passwordConfirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                error={passwordConfirmationError !== ""}
                helperText={passwordConfirmationError}
              />
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={closeAlert}
            open={Boolean(error)}
            autoHideDuration={6000}
          >
            <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
