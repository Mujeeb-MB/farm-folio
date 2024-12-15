import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import farmerImage from "../assets/farmer4.webp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));

    if (field === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Enter a valid email address",
      }));
    } else if (field === "password") {
      setFormErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters",
      }));
    }
  };

  const handleFirebase = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formErrors.email && !formErrors.password) {
      handleFirebase();
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the form errors before submitting.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Grid container>
      {/* Left Image Section */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundImage: `url(${farmerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>

      {/* Right Login Form Section */}
      <Grid item xs={12} md={6}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{
              color: "#666",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Track your farms effortlessly with FarmFolio.
          </Typography>

          <Box
            width="100%"
            maxWidth="400px"
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                style: { borderRadius: "8px" },
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={formValues.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                style: { borderRadius: "8px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                marginTop: "12px",
                borderRadius: "12px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Login
            </Button>
            <Button
              startIcon={<GoogleIcon sx={{ color: "#339961" }} />}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#000",
                color: "#FFF",
                marginTop: "10px",
                borderRadius: "12px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Continue with Google
            </Button>
          </Box>

          <Divider
            sx={{ margin: "24px 0", width: "100%", maxWidth: "400px" }}
          />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#339961",
              }}
            >
              Sign up now
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
