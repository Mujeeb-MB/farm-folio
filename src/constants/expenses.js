// src/constants/expenses.js
import { useTranslation } from "react-i18next";

export const useExpenseCategories = () => {
  const { t } = useTranslation();

  return {
    [t("expense.categories.seeds.title")]: [
      t("expense.categories.seeds.cropSeeds"),
      t("expense.categories.seeds.hybridSeeds"),
      t("expense.categories.seeds.organicSeeds"),
    ],
    [t("expense.categories.fertilizers.title")]: [
      t("expense.categories.fertilizers.organicFertilizers"),
      t("expense.categories.fertilizers.chemicalFertilizers"),
      t("expense.categories.fertilizers.bioFertilizers"),
    ],
    [t("expense.categories.labor.title")]: [
      t("expense.categories.labor.landPreparation"),
      t("expense.categories.labor.sowing"),
      t("expense.categories.labor.weeding"),
      t("expense.categories.labor.harvesting"),
      t("expense.categories.labor.dailyWages"),
    ],
    [t("expense.categories.equipment.title")]: [
      t("expense.categories.equipment.machineryRent"),
      t("expense.categories.equipment.toolsPurchase"),
      t("expense.categories.equipment.maintenance"),
    ],
    [t("expense.categories.pesticides.title")]: [
      t("expense.categories.pesticides.insecticides"),
      t("expense.categories.pesticides.fungicides"),
      t("expense.categories.pesticides.weedicides"),
    ],
    [t("expense.categories.irrigation.title")]: [
      t("expense.categories.irrigation.waterCharges"),
      t("expense.categories.irrigation.fuelCharges"),
      t("expense.categories.irrigation.equipmentMaintenance"),
    ],
    [t("expense.categories.transportation.title")]: [
      t("expense.categories.transportation.vehicleRent"),
      t("expense.categories.transportation.fuel"),
      t("expense.categories.transportation.loadingUnloading"),
    ],
    [t("expense.categories.others.title")]: [
      t("expense.categories.others.miscellaneous"),
    ],
  };
};

export const usePaymentStatuses = () => {
  const { t } = useTranslation();
  return [
    t("expense.paymentStatusFilter.paid"),
    t("expense.paymentStatusFilter.pending"),
  ];
};

export const usePaymentModes = () => {
  const { t } = useTranslation();
  return [
    t("expense.paymentModeFilter.cash"),
    t("expense.paymentModeFilter.upi"),
    t("expense.paymentModeFilter.bankTransfer"),
    t("expense.paymentModeFilter.credit"),
  ];
};
