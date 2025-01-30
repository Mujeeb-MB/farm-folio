// src/components/Expenses/ExpenseFilterBar.jsx
import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import {
  useExpenseCategories,
  usePaymentStatuses,
} from "../../constants/expenses";

export default function ExpenseFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const { t } = useTranslation();
  const expenseCategories = useExpenseCategories();
  const paymentStatuses = usePaymentStatuses();

  const handleChange = (name, value) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label={t("expense.expenseFilter.fromDate")}
            value={filters.fromDate || ""}
            onChange={(e) => handleChange("fromDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label={t("expense.expenseFilter.toDate")}
            value={filters.toDate || ""}
            onChange={(e) => handleChange("toDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>{t("expense.expenseFilter.category")}</InputLabel>
            <Select
              value={filters.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
              label={t("expense.expenseFilter.category")}
            >
              <MenuItem value="">
                {t("expense.expenseFilter.allCategories")}
              </MenuItem>
              {Object.keys(expenseCategories).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>{t("expense.paymentStatus")}</InputLabel>
            <Select
              value={filters.paymentStatus || ""}
              onChange={(e) => handleChange("paymentStatus", e.target.value)}
              label={t("expense.paymentStatus")}
            >
              <MenuItem value="">
                {t("expense.expenseFilter.allStatus")}
              </MenuItem>
              {paymentStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <FormControl fullWidth>
            <InputLabel>{t("expense.expenseFilter.sortBy")}</InputLabel>
            <Select
              value={filters.sortBy || "date"}
              onChange={(e) => handleChange("sortBy", e.target.value)}
              label={t("expense.expenseFilter.sortBy")}
            >
              <MenuItem value="date">
                {t("expense.expenseFilter.date")}
              </MenuItem>
              <MenuItem value="amount">
                {t("expense.expenseFilter.amount")}
              </MenuItem>
              <MenuItem value="category">
                {t("expense.expenseFilter.category")}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <Tooltip title={t("expense.expenseFilter.clearFilters")}>
            <IconButton onClick={onClearFilters}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
