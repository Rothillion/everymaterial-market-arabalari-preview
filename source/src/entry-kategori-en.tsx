import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { CategoryPage } from "./pages/CategoryPage";
import "./styles/globals.css";

const familySlug = new URLSearchParams(window.location.search).get("aile") ?? "metal-yuk-tasima";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <CategoryPage lang="en" familySlug={familySlug} />
    </MotionConfig>
  </StrictMode>,
);
