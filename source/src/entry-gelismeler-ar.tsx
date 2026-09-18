import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { UpdatesPage } from "./pages/UpdatesPage";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <UpdatesPage lang="ar" />
    </MotionConfig>
  </StrictMode>,
);
