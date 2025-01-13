// Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="absolute" // Changed from 'static' to 'absolute' to overlay on hero image
      color="transparent"
      elevation={0}
      sx={{ top: 0, mt: 5 }} // Ensure it's at the top of the page
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              color: "#fff", // White color to be visible over the image
              fontSize: "32px",
            }}
            onClick={() => navigate("/")}
          >
            <span style={{ color: "#40bf79", fontWeight: "bold" }}>Farm</span>
            Folio.
          </Typography>

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="text"
              sx={{
                color: "#000",
                textTransform: "none",
                bgcolor: "white",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "#000",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: "8px" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
