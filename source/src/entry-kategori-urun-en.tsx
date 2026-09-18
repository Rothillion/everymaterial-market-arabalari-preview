import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { CategoryProductDetailPage } from "./pages/CategoryProductDetailPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <CategoryProductDetailPage lang="en" />
    </MotionConfig>
  </StrictMode>,
);
