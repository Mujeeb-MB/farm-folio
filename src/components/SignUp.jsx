import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import farmerImage from "../assets/farmer2.webp";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container>
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
      <Grid item xs={12} md={6}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 16 }}
          >
            Sign Up
          </Button>
          <Button
            startIcon={<GoogleIcon />}
            variant="outlined"
            fullWidth
            style={{ marginTop: 16 }}
          >
            Continue with Google
          </Button>
          <Divider style={{ margin: "24px 0" }} />
          <Typography variant="body2">
            Already have an account?{" "}
            <Button color="primary" onClick={() => navigate("/login")}>
              Signin
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
