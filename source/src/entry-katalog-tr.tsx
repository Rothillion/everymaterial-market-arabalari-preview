import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { CatalogPage } from "./pages/CatalogPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <CatalogPage lang="tr" />
    </MotionConfig>
  </StrictMode>,
);
