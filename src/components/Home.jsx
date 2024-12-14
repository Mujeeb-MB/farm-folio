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
            fontSize: { xs: "1.5rem", md: "1.5rem", lg: "2rem" },
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {/* Main Heading */}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "2.5rem", lg: "3rem" },
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
            fontSize: { xs: "1rem", md: "1rem", lg: "1.3rem" },
            marginTop: 4,
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
          // bottom:16,
          top: "70%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            padding: "8px 22px",
            fontSize: "1rem",
            textTransform: "none",
            color: "#000000",
            bgcolor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#339961",
              color: "#FFF",
            },
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
            fontSize: "1rem",
            textTransform: "none",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#FFF",
              color: "#000",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
