import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import farmerImage from "../assets/farmer2.webp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import SigninWithGoogle from "./SigninWithGoogle";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validate = (field, value) => {
    const newErrors = { ...errors };

    if (field === "firstName" || field === "lastName") {
      if (!value.trim()) {
        newErrors[field] = "This field is required";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        newErrors[field] = "Only letters are allowed";
      } else {
        delete newErrors[field];
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email is invalid";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (!value.trim()) {
        newErrors.password = "Password is required";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        newErrors.password =
          "Password must contain at least one special character";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate while typing
    validate(name, value);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFirebase = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          photo: "",
        });
      }
      setSnackbar({
        open: true,
        message: "Sign-up successful!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Sign-up failed: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submission
    const allFieldsValid = Object.keys(formData).every((key) => {
      validate(key, formData[key]);
      return !errors[key];
    });

    if (allFieldsValid) {
      handleFirebase();
    }
  };

  return (
    <Grid container>
      {/* Left Side with Farmer Image */}
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

      {/* Right Side with Sign-Up Form */}
      <Grid item xs={12} md={6}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {/* Header Section */}
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Join FarmFolio
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              color: "#666",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Empower your farming journey with ease.
          </Typography>

          {/* Form Section */}
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
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
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
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { borderRadius: "8px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{
                marginTop: "12px",
                borderRadius: "12px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Sign Up
            </Button>

            {/* Google.... */}
            <SigninWithGoogle />
          </Box>

          {/* Divider and Login Link */}
          <Divider
            sx={{ margin: "24px 0", width: "100%", maxWidth: "400px" }}
          />
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#339961" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
