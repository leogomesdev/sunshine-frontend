import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import WbSunny from "@mui/icons-material/WbSunny";
import Alert from "./shared/Alert";
import AppConfig from "../configs/AppConfig";
import AuthContext from "../auth/AuthContext";
import Constants from "../configs/Constants";

const Login: React.FC = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  function validateEmail() {
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

  function validatePassword() {
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  }

  function validateFormData() {
    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();
    return emailIsValid && passwordIsValid;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateFormData()) {
      return;
    }

    axios
      .post(`${AppConfig.backendUrl}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        setError("");
        localStorage.setItem("authToken", response.data.token);
        handleLogin();
        navigate("/");
      })
      .catch((error) => {
        if (["404", "500"].includes(error.response.status)) {
          setError(error.message);
          return;
        }
        setError(error.response?.data?.message || error?.message);
      });
  };

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
          <WbSunny />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            error={emailError !== ""}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError !== ""}
            helperText={passwordError}
          />
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
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account yet? Register now"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
