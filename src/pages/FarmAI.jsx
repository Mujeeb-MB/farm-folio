// src/pages/FarmAI.jsx
import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Card, CardContent } from "@mui/material";
import {
  Chat as ChatIcon,
  BugReport as DiseaseIcon,
} from "@mui/icons-material";

// We'll create these components
import FarmAIChat from "../components/FarmAI/FarmAIChat";
import { useTranslation } from "react-i18next";
// import DiseaseDetection from "../components/FarmAI/DiseaseDetection";

export default function FarmAI() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("chat");

  const tabs = [
    {
      value: "chat",
      label: `${t("farmAI.chat")}`,
      icon: ChatIcon,
      description: `${t("farmAI.chatDesc")}`,
    },
    {
      value: "disease",
      label: `${t("farmAI.diseaseDetection")}`,
      icon: DiseaseIcon,
      description: `${t("farmAI.diseaseDetectionDesc")}`,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        {t("farmAI.assistant")}
      </Typography>

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={<tab.icon />}
                iconPosition="start"
              />
            ))}
          </Tabs>

          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary" gutterBottom>
              {tabs.find((tab) => tab.value === activeTab)?.description}
            </Typography>

            {activeTab === "chat" && <FarmAIChat />}
            {activeTab === "disease" && (
              // <DiseaseDetection />
              <Typography>{t("farmAI.comingSoon")}</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
