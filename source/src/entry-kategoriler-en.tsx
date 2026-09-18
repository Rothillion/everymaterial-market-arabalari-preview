import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { ProductCategoryPage } from "./pages/ProductCategoryPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ProductCategoryPage lang="en" />
    </MotionConfig>
  </StrictMode>,
);
