import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { ProjectDetailAhsapStandlarPage } from "./pages/ProjectDetailAhsapStandlarPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ProjectDetailAhsapStandlarPage lang="tr" />
    </MotionConfig>
  </StrictMode>,
);
