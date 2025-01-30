// src/constants/crops.js

import { useTranslation } from "react-i18next";
import React from "react";

export const CropsComponent = () => {
  const { t } = useTranslation();

  const crops = {
    [t("crops.cereals.title")]: [
      t("crops.cereals.paddy"),
      t("crops.cereals.wheat"),
      t("crops.cereals.jowar"),
      t("crops.cereals.bajra"),
      t("crops.cereals.ragi"),
      t("crops.cereals.maize"),
    ],
    [t("crops.pulses.title")]: [
      t("crops.pulses.redGram"),
      t("crops.pulses.blackGram"),
      t("crops.pulses.greenGram"),
      t("crops.pulses.bengalGram"),
      t("crops.pulses.horseGram"),
      t("crops.pulses.cowpea"),
    ],
    [t("crops.oilseeds.title")]: [
      t("crops.oilseeds.groundnut"),
      t("crops.oilseeds.sunflower"),
      t("crops.oilseeds.sesame"),
      t("crops.oilseeds.soybean"),
      t("crops.oilseeds.mustard"),
      t("crops.oilseeds.castor"),
    ],
    [t("crops.commercial.title")]: [
      t("crops.commercial.cotton"),
      t("crops.commercial.sugarcane"),
      t("crops.commercial.tobacco"),
      t("crops.commercial.jute"),
    ],
    [t("crops.vegetables.title")]: [
      t("crops.vegetables.tomato"),
      t("crops.vegetables.onion"),
      t("crops.vegetables.potato"),
      t("crops.vegetables.brinjal"),
      t("crops.vegetables.okra"),
      t("crops.vegetables.cabbage"),
      t("crops.vegetables.cauliflower"),
      t("crops.vegetables.carrot"),
      t("crops.vegetables.greenChilli"),
      t("crops.vegetables.cucumber"),
    ],
    [t("crops.fruits.title")]: [
      t("crops.fruits.mango"),
      t("crops.fruits.banana"),
      t("crops.fruits.grapes"),
      t("crops.fruits.pomegranate"),
      t("crops.fruits.papaya"),
      t("crops.fruits.orange"),
      t("crops.fruits.guava"),
      t("crops.fruits.watermelon"),
    ],
    [t("crops.spices.title")]: [
      t("crops.spices.turmeric"),
      t("crops.spices.chilli"),
      t("crops.spices.ginger"),
      t("crops.spices.cardamom"),
      t("crops.spices.blackPepper"),
      t("crops.spices.coriander"),
    ],
  };

  return crops;
};
