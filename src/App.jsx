import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Profile from "./components/Profile";

// Define the theme with Poppins
const theme = createTheme({
  palette: {
    primary: {
      main: "#339961", //
    },
    secondary: {
      main: "#000000", // Black
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif", // Poppins added
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
