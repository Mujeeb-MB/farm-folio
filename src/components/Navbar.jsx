// src/components/Navbar/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Person,
  Settings,
  Security,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useTheme } from "../context/ThemeContext";

import LanguageSwitcher from "./common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

export default function Navbar({ open }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { t } = useTranslation();

  const { darkMode, toggleTheme } = useTheme();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${open ? drawerWidth : 73}px)` },
        ml: { sm: `${open ? drawerWidth : 73}px` },
        transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitcher />
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleProfileClick}
        >
          <Typography sx={{ mr: 1 }}>
            {currentUser?.displayName || currentUser?.email}
          </Typography>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="profile"
                style={{ width: "100%" }}
              />
            ) : (
              (
                currentUser?.displayName?.[0] || currentUser?.email?.[0]
              )?.toUpperCase()
            )}
          </Avatar>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleProfileClose();
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            {t("nav.profile")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleProfileClose();
              navigate("/settings");
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {t("nav.settings")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleProfileClose();
              navigate("/privacy");
            }}
          >
            <ListItemIcon>
              <Security fontSize="small" />
            </ListItemIcon>
            {t("nav.privacy")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t("nav.signout")}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
