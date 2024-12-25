// src/pages/FarmAI.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Chat as ChatIcon,
  BugReport as DiseaseIcon,
  Agriculture as CropIcon,
  Science as FertilizerIcon,
} from "@mui/icons-material";

// Components we'll create
// import AIChat from "../components/FarmAI/AIChat/ChatInterface";
// import DiseaseDetection from "../components/FarmAI/DiseaseDetection/DiseaseScanner";
// import CropPlanning from "../components/FarmAI/CropPlanning/CropAdvisor";
// import FertilizerGuide from "../components/FarmAI/FertilizerGuide/FertilizerAdvisor";

export default function FarmAI() {
  const [activeTab, setActiveTab] = useState("chat");
  const [language, setLanguage] = useState("english");

  const languages = [
    { code: "english", label: "English" },
    { code: "hindi", label: "हिंदी" },
    { code: "telugu", label: "తెలుగు" },
    { code: "tamil", label: "தமிழ்" },
    // Add more languages
  ];

  const tabs = [
    { value: "chat", label: "AI Chat", icon: ChatIcon },
    { value: "disease", label: "Disease Detection", icon: DiseaseIcon },
    { value: "crop", label: "Crop Planning", icon: CropIcon },
    { value: "fertilizer", label: "Fertilizer Guide", icon: FertilizerIcon },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          FarmAI Assistant
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Card>
        <CardContent>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
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

          {/* <Box sx={{ mt: 2 }}>
            {activeTab === "chat" && <AIChat language={language} />}
            {activeTab === "disease" && (
            //   <DiseaseDetection language={language} />
            )}
            {activeTab === "crop" && <CropPlanning language={language} />}
            {activeTab === "fertilizer" && (
            //   <FertilizerGuide language={language} />
            )}
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
}
