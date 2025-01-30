// src/components/Farms/FarmFilters.jsx
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
} from "@mui/material";
import { Clear as ClearIcon, Crop } from "@mui/icons-material";
import { CropsComponent } from "../../constants/crops";
import { useTranslation } from "react-i18next";

export default function FarmFilters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const { t } = useTranslation();
  const crops = CropsComponent();
  const seasons = [
    `${t("farmManagement.farmFilter.kharif")}`,
    `${t("farmManagement.farmFilter.rabi")}`,
    `${t("farmManagement.farmFilter.zaid")}`,
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        name="search"
        label={t("farmManagement.farmFilter.searchFarm")}
        size="small"
        value={filters.search || ""}
        onChange={handleChange}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t("farmManagement.farmFilter.cropCategory")}</InputLabel>
        <Select
          name="cropCategory"
          value={filters.cropCategory || ""}
          onChange={handleChange}
          label={t("farmManagement.farmFilter.cropCategory")}
        >
          <MenuItem value="">
            {t("farmManagement.farmFilter.allCategories")}
          </MenuItem>
          {Object.keys(crops).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t("farmManagement.farmFilter.season")}</InputLabel>
        <Select
          name="season"
          value={filters.season || ""}
          onChange={handleChange}
          label={t("farmManagement.farmFilter.season")}
        >
          <MenuItem value="">
            {t("farmManagement.farmFilter.allSeasons")}
          </MenuItem>
          {seasons.map((season) => (
            <MenuItem key={season} value={season}>
              {season}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Tooltip title="Clear filters">
        <IconButton onClick={onClearFilters} size="small">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
