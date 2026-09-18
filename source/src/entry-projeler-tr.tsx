import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { ProjectsPage } from "./pages/ProjectsPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ProjectsPage lang="tr" />
    </MotionConfig>
  </StrictMode>,
);
