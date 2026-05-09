// ─── Public API ─────────────────────────────────────────────────────────
// This file exports ONLY the stable public API.
// No logic, no runtime imports, no side effects.

export { initMotion } from "./runtime/init.js";
export { registerPreset } from "./core/registry.js";
export { motion } from "./motion.js";
export { stagger } from "./stagger.js";

// ─── Public Types ───────────────────────────────────────────────────────
export type {
  MotionOptions,
  MotionPreset,
  MotionConfig,
  MotionCleanup,
  ScrollOptions,
  StaggerConfig,
} from "./types/public.js";

// ─── Logger configuration ───────────────────────────────────────────────
export { setLogLevel } from "./logger/index.js";
export { LogLevel } from "./logger/levels.js";
