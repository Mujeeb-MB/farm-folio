// src/components/Farms/EditFarmDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { CropsComponent } from "../../constants/crops";
import { useTranslation } from "react-i18next";

export default function EditFarmDialog({ open, onClose, farm, onFarmUpdated }) {
  const crops = CropsComponent();
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();

  const seasons = [
    t("farmManagement.kharif"),
    t("farmManagement.rabi"),
    t("farmManagement.zaid"),
  ];

  const stages = [
    t("farmManagement.landPreparation"),
    t("farmManagement.sowing"),
    t("farmManagement.growing"),
    t("farmManagement.harvesting"),
  ];

  const areaUnits = [t("farmManagement.acres"), t("farmManagement.guntas")];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Convert standard value to translated value
  const getTranslatedAreaUnit = (standardUnit) => {
    if (standardUnit === "acres") return t("farmManagement.acres");
    if (standardUnit === "guntas") return t("farmManagement.guntas");
    return standardUnit;
  };

  // Convert translated value to standard value
  const getStandardAreaUnit = (translatedUnit) => {
    if (translatedUnit === t("farmManagement.acres")) return "acres";
    if (translatedUnit === t("farmManagement.guntas")) return "guntas";
    return translatedUnit;
  };

  const [formData, setFormData] = useState({
    farmName: "",
    village: "",
    mandal: "",
    district: "",
    totalArea: "",
    areaUnit: t("farmManagement.acres"),
    cropCategory: "",
    cropType: "",
    season: "",
    currentStage: "",
  });

  // Initialize form data when farm prop changes
  useEffect(() => {
    if (farm && !initialized) {
      const category = Object.keys(crops).find((cat) =>
        crops[cat].includes(farm.cropType)
      );

      const newFormData = {
        farmName: farm.farmName || "",
        village: farm.village || "",
        mandal: farm.mandal || "",
        district: farm.district || "",
        totalArea: farm.totalArea || "",
        areaUnit: getTranslatedAreaUnit(farm.areaUnit),
        cropCategory: category || "",
        cropType: farm.cropType || "",
        season: farm.season || "",
        currentStage: farm.currentStage || "",
      };

      setFormData(newFormData);
      setInitialized(true);
    }
  }, [farm, initialized, i18n.language]);

  // Update translations when language changes
  useEffect(() => {
    if (initialized && farm) {
      setFormData((prev) => ({
        ...prev,
        areaUnit: getTranslatedAreaUnit(farm.areaUnit),
        season: prev.season
          ? t(`farmManagement.${prev.season.toLowerCase()}`)
          : "",
        currentStage: prev.currentStage
          ? t(`farmManagement.${prev.currentStage.toLowerCase()}`)
          : "",
      }));
    }
  }, [i18n.language]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setInitialized(false);
      setFormData({
        farmName: "",
        village: "",
        mandal: "",
        district: "",
        totalArea: "",
        areaUnit: t("farmManagement.acres"),
        cropCategory: "",
        cropType: "",
        season: "",
        currentStage: "",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cropCategory" ? { cropType: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farm?.id) return;

    setLoading(true);
    setError("");

    try {
      const farmRef = doc(db, `users/${currentUser.uid}/farms/${farm.id}`);
      const updateData = {
        farmName: formData.farmName.trim(),
        village: formData.village.trim(),
        mandal: formData.mandal.trim(),
        district: formData.district.trim(),
        totalArea: Number(formData.totalArea),
        areaUnit: getStandardAreaUnit(formData.areaUnit),
        cropType: formData.cropType,
        season: formData.season,
        currentStage: formData.currentStage,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(farmRef, updateData);
      setSuccess(true);
      onFarmUpdated && onFarmUpdated();
      handleClose();
    } catch (error) {
      console.error("Error updating farm:", error);
      setError(t("farmManagement.updateError"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError("");
    setInitialized(false);
  };

  if (!initialized && farm) {
    return null;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>{t("farmManagement.editFarm")}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="farmName"
                  label={t("farmManagement.farmName")}
                  fullWidth
                  required
                  value={formData.farmName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="village"
                  label={t("farmManagement.village")}
                  fullWidth
                  required
                  value={formData.village}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="mandal"
                  label={t("farmManagement.mandal")}
                  fullWidth
                  required
                  value={formData.mandal}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="district"
                  label={t("farmManagement.district")}
                  fullWidth
                  required
                  value={formData.district}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="totalArea"
                  label={t("farmManagement.totalArea")}
                  type="number"
                  fullWidth
                  required
                  value={formData.totalArea}
                  onChange={handleChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>{t("farmManagement.areaUnit")}</InputLabel>
                  <Select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    label={t("farmManagement.areaUnit")}
                  >
                    {areaUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>{t("farmManagement.cropCategory")}</InputLabel>
                  <Select
                    name="cropCategory"
                    value={formData.cropCategory}
                    onChange={handleChange}
                    label={t("farmManagement.cropCategory")}
                  >
                    {Object.keys(crops).map((category) => (
                      <MenuItem key={category} value={category}>
                        {t(`crops.${category}.title`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  disabled={!formData.cropCategory}
                >
                  <InputLabel>{t("farmManagement.cropType")}</InputLabel>
                  <Select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    label={t("farmManagement.cropType")}
                  >
                    {formData.cropCategory &&
                      crops[formData.cropCategory].map((crop) => (
                        <MenuItem key={crop} value={crop}>
                          {t(`crops.${formData.cropCategory}.${crop}`)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>{t("farmManagement.season")}</InputLabel>
                  <Select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    label={t("farmManagement.season")}
                  >
                    {seasons.map((season) => (
                      <MenuItem key={season} value={season}>
                        {season}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>{t("farmManagement.currentStage")}</InputLabel>
                  <Select
                    name="currentStage"
                    value={formData.currentStage}
                    onChange={handleChange}
                    label={t("farmManagement.currentStage")}
                  >
                    {stages.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose}>{t("farmManagement.cancel")}</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading
                ? t("farmManagement.updating")
                : t("farmManagement.updateFarm")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={() => {
          setError("");
          setSuccess(false);
        }}
      >
        <Alert
          severity={error ? "error" : "success"}
          variant="filled"
          onClose={() => {
            setError("");
            setSuccess(false);
          }}
        >
          {error || t("farmManagement.farmUpdated")}
        </Alert>
      </Snackbar>
    </>
  );
}
