// src/components/Farms/AddFarmDialog.jsx
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
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CropsComponent } from "../../constants/crops";
import { useTranslation } from "react-i18next";

export default function AddFarmDialog({ open, onClose, onFarmAdded }) {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
  const crops = CropsComponent();

  // Constants with translations
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

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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

  // Update form values when language changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      areaUnit: t("farmManagement.acres"),
    }));
  }, [i18n.language, t]);

  // Convert translated value to standard value for storage
  const getStandardAreaUnit = (translatedUnit) => {
    if (translatedUnit === t("farmManagement.acres")) return "acres";
    if (translatedUnit === t("farmManagement.guntas")) return "guntas";
    return translatedUnit;
  };

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
    setLoading(true);
    setError("");

    try {
      const farmData = {
        ...formData,
        areaUnit: getStandardAreaUnit(formData.areaUnit),
        totalArea: Number(formData.totalArea),
        status: "Active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const farmsRef = collection(db, `users/${currentUser.uid}/farms`);
      await addDoc(farmsRef, farmData);

      setSuccess(true);
      onFarmAdded && onFarmAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding farm:", error);
      setError(t("farmManagement.addFarmError"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
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
    setError("");
    onClose();
  };

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
        <DialogTitle>{t("farmManagement.addNewFarm")}</DialogTitle>
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
                        {t(`${category}`)}
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
                          {t(`${crop}`)}
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
                ? t("farmManagement.adding")
                : t("farmManagement.addFarm")}
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
          {error || t("farmManagement.farmAdded")}
        </Alert>
      </Snackbar>
    </>
  );
}
