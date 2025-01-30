// src/components/Dashboard/QuickStats.jsx
import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  Agriculture as FarmIcon,
  AccountBalance as ExpenseIcon,
  Pending as PendingIcon,
  Done as PaidIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function QuickStats({ stats }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const { t } = useTranslation();

  const statCards = [
    {
      title: `${t("dashboard.totalFarms")}`,
      value: stats.totalFarms,
      icon: FarmIcon,
      color: "primary.main",
      bgColor: "primary.lighter",
    },
    {
      title: `${t("dashboard.totalExpenses")}`,
      value: formatCurrency(stats.totalExpenses),
      icon: ExpenseIcon,
      color: "info.main",
      bgColor: "info.lighter",
    },
    {
      title: `${t("dashboard.pendingPayments")}`,
      value: formatCurrency(stats.pendingAmount),
      icon: PendingIcon,
      color: "warning.main",
      bgColor: "warning.lighter",
    },
    {
      title: `${t("dashboard.paidAmount")}`,
      value: formatCurrency(stats.paidAmount),
      icon: PaidIcon,
      color: "success.main",
      bgColor: "success.lighter",
    },
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: stat.bgColor,
                    mr: 2,
                  }}
                >
                  <stat.icon sx={{ color: stat.color }} />
                </Box>
                <Typography variant="h6" component="div">
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: stat.color }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
