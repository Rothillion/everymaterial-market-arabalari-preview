import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { LegalPage } from "./pages/LegalPage";
import { legalContent } from "./content/legal";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LegalPage lang="tr" content={legalContent.tr.cookies} navigateHref={(l) => `/cerez-politikasi-${l}.html`} />
    </MotionConfig>
  </StrictMode>,
);
