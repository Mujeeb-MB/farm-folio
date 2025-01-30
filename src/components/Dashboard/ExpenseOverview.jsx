// src/components/Dashboard/ExpenseOverview.jsx
import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

export default function ExpenseOverview({ expenses }) {
  const { t } = useTranslation();
  const chartData = useMemo(() => {
    const monthlyData = expenses.reduce((acc, expense) => {
      const date = expense.date.toDate();
      const monthYear = date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          total: 0,
          paid: 0,
          pending: 0,
        };
      }

      acc[monthYear].total += expense.amount;
      if (expense.paymentStatus === "Paid") {
        acc[monthYear].paid += expense.amount;
      } else {
        acc[monthYear].pending += expense.amount;
      }

      return acc;
    }, {});

    return Object.values(monthlyData).slice(-6); // Last 6 months
  }, [expenses]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("dashboard.expenseOverview.title")}
        </Typography>

        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) =>
                  `${t("dashboard.expenseOverview.month")} ${label}`
                }
              />
              <Bar
                dataKey="paid"
                name={t("dashboard.expenseOverview.paid")}
                fill="#2e7d32"
                stackId="a"
              />
              <Bar
                dataKey="pending"
                name={t("dashboard.expenseOverview.pending")}
                fill="#DC143C"
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
