// src/components/Sidebar/Sidebar.jsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Agriculture,
  Receipt,
  Analytics,
  Help,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Farm Management", icon: <Agriculture />, path: "/farm-management" },
  { text: "Expense Tracking", icon: <Receipt />, path: "/expenses" },
  { text: "Reports & Analytics", icon: <Analytics />, path: "/reports" },
];

export default function Sidebar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 73,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 73,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          minHeight: 64,
        }}
      >
        {open && (
          <Typography variant="h6" color="primary" noWrap>
            FARMFOLIO
          </Typography>
        )}
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(51, 153, 97, 0.08)"
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(51, 153, 97, 0.12)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "inherit",
                    "& .MuiTypography-root": {
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{ position: "fixed", bottom: 0, width: open ? drawerWidth : 73 }}
      >
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Help />
            </ListItemIcon>
            {open && <ListItemText primary="Need Help?" />}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}
