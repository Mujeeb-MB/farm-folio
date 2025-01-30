// src/components/Dashboard/RecentExpenses.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RecentExpenses({ expenses }) {
  const { t } = useTranslation();
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("dashboard.recentExpenses.title")}
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("dashboard.recentExpenses.date")}</TableCell>
                <TableCell>{t("dashboard.recentExpenses.farm")}</TableCell>
                <TableCell>{t("dashboard.recentExpenses.category")}</TableCell>
                <TableCell>
                  {t("dashboard.recentExpenses.description")}
                </TableCell>
                <TableCell align="right">
                  {t("dashboard.recentExpenses.amount")}
                </TableCell>
                <TableCell>{t("dashboard.recentExpenses.status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell>{expense.farmName}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {expense.description || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={expense.paymentStatus}
                      size="small"
                      color={getPaymentStatusColor(expense.paymentStatus)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {expenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      {t("dashboard.recentExpenses.noExpenses")}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
