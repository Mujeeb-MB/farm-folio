// src/components/Expenses/ExpensePrintView.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ExpensePrintView({
  open,
  onClose,
  expenses,
  farmName,
}) {
  const { t } = useTranslation();
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          "@media print": {
            width: "100%",
            height: "100%",
            margin: 0,
            padding: "20px",
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {t("expense.expensePrint.expenseReport")}
        </Typography>
        <Typography variant="subtitle1">
          {new Date().toLocaleDateString()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5">{farmName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {t("expense.expensePrint.totalExpenses")}: ₹
            {totalAmount.toLocaleString()}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("expense.expensePrint.date")}</TableCell>
              <TableCell>{t("expense.expensePrint.category")}</TableCell>
              <TableCell>{t("expense.expensePrint.description")}</TableCell>
              <TableCell align="right">
                {t("expense.expensePrint.amount")}
              </TableCell>
              <TableCell>{t("expense.expensePrint.status")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {expense.date.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell align="right">
                  ₹{expense.amount.toLocaleString()}
                </TableCell>
                <TableCell>{expense.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions sx={{ "@media print": { display: "none" } }}>
        <Button onClick={onClose}>{t("expense.expensePrint.close")}</Button>
        <Button onClick={handlePrint} variant="contained">
          {t("expense.expensePrint.print")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
