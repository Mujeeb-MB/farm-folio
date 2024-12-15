import React from "react";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BgImage from "../assets/cover1.png";

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins",
      }}
    >
      {/* Black Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Top Left FarmFolio Text as Clickable Logo */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: "8%",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => navigate("/")}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem", lg: "2rem" },
            fontWeight: "bold",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#FBBF24" }}>F</span>armFolio.
        </Typography>
      </Box>

      {/* Centered Animated Text */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "40%", sm: "45%", md: "50%" },
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Main Heading */}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            fontWeight: "bold",
            lineHeight: 1.2,
            animation: `${fadeIn} 2s ease-in-out`,
          }}
        >
          Welcome to{" "}
          <span
            style={{
              color: "#40bf79",
              fontFamily: "Cedarville Cursive",
            }}
          >
            FarmFolio.
          </span>
        </Typography>

        {/* FarmFolio-Specific Subheading */}
        <Typography
          component="p"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", lg: "1.3rem" },
            marginTop: 2,
            animation: `${fadeIn} 2s ease-in-out`,
          }}
        >
          Empowering farmers to track expenses, optimize resources, and grow
          smarter. FarmFolio is your one-stop solution for managing every detail
          of your farm with ease.
        </Typography>
      </Box>

      {/* Modern Login and Signup Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "65%", sm: "70%" },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 4 },
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            padding: "8px 22px",
            fontSize: "0.9rem",
            textTransform: "none",
            color: "#000000",
            bgcolor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#339961",
              color: "#FFF",
            },
            width: { xs: "80%", sm: "auto" },
          }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "10px",
            padding: "8px 26px",
            fontSize: "0.9rem",
            textTransform: "none",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#FFF",
              color: "#000",
            },
            width: { xs: "80%", sm: "auto" },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
