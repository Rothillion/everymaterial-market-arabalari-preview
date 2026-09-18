import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { BlogArticlePage } from "./pages/BlogArticlePage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BlogArticlePage lang="en" />
    </MotionConfig>
  </StrictMode>,
);
