import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import farmerImage from "../assets/farmer4.webp";

export default function Login() {
  const navigate = useNavigate();

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
            Login
          </Typography>
          <TextField label="Email" type="email" fullWidth margin="normal" />
          <TextField
            label="Password"
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
            Login
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
            Don't have an account?{" "}
            <Button color="primary" onClick={() => navigate("/signup")}>
              Sign up now
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
