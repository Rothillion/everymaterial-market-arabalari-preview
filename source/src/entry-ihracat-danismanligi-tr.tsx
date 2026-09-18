import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { ExportConsultancyPage } from "./pages/ExportConsultancyPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ExportConsultancyPage lang="tr" />
    </MotionConfig>
  </StrictMode>,
);
