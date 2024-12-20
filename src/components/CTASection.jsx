import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "primary.main",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Ready to streamline your farm management?
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Join FarmerFolio today and take control of your farm's finances.
        </Typography>
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            bgcolor: "black",
          }}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
