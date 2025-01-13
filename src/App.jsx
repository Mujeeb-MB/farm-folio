// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FarmManagement from "./pages/FarmManagement";
import ExpenseTracking from "./pages/ExpenseTracking";
import Reports from "./pages/Reports";
import Profile from "./components/Profile";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import FarmAI from "./pages/FarmAI";

const theme = createTheme({
  palette: {
    primary: {
      main: "#339961",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
  },
});

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Define page titles based on route paths
    const pageTitles = {
      "/": "Farmfolio - Home",
      "/login": "Farmfolio - Login",
      "/signup": "Farmfolio - SignUp",
      "/dashboard": "Farmfolio - Dashboard",
      "/farm-management": "Farmfolio - Farm Management",
      "/expenses": "Farmfolio - Expenses",
      "/reports": "Farmfolio - Reports",
      "/farm-ai": "Farmfolio - FarmAI",
      "/profile": "Farmfolio - Profile",
      "/settings": "Farmfolio - Settings",
      "/privacy": "Farmfolio - Privacy",
    };

    document.title = pageTitles[location.pathname] || "Farmfolio";
  }, [location]);

  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <DynamicTitle />

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes - all wrapped with DashboardLayout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm-management"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <FarmManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ExpenseTracking />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/farm-ai"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <FarmAI />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Privacy />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
