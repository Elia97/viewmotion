import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initMotion } from "viewmotion";
import "viewmotion/styles.css";
import App from "./App";
import "./styles.css";

// Init Lenis smooth scroll (animations are handled by useMotion hook)
initMotion();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
