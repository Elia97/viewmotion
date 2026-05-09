/**
 * Preset registry — centralized map of animation presets.
 *
 * Separated from CSS injection (which is a DOM side effect)
 * to keep this module testable without a DOM.
 */

import type { MotionPreset } from "../types/public.js";
import { logger } from "../logger/index.js";

/**
 * Centralised map of all animation presets.
 * Each preset references a CSS @keyframes name defined in styles.css.
 */
export const PRESETS: Record<string, MotionPreset> = {
  fade: { keyframes: "motion-fade" },
  "fade-up": { keyframes: "motion-fade-up" },
  "fade-down": { keyframes: "motion-fade-down" },
  "slide-left": { keyframes: "motion-slide-left" },
  "slide-right": { keyframes: "motion-slide-right" },
  "scale-in": { keyframes: "motion-scale-in" },
  "zoom-out": { keyframes: "motion-zoom-out" },
  "blur-in": { keyframes: "motion-blur-in" },
};

/**
 * Registers a custom animation preset.
 *
 * The `keyframes` value must match a @keyframes name you define in your CSS.
 * Also injects the CSS rules needed to hide and reveal elements with that
 * data-motion value (DOM injection is a no-op during SSR).
 *
 * @example
 * registerPreset('flip', { keyframes: 'my-flip' })
 */
export function registerPreset(name: string, preset: MotionPreset): void {
  PRESETS[name] = preset;
  logger.debug(`Preset registered: "${name}" → @keyframes ${preset.keyframes}`);
  injectPresetCSS(name, preset);
}

/**
 * Inject CSS rules for a custom preset into the document head.
 * Idempotent — skips if the style tag already exists.
 * SSR-safe — no-op when `document` is unavailable.
 */
function injectPresetCSS(name: string, preset: MotionPreset): void {
  if (typeof document === "undefined") return;

  const id = `wm-preset-${name}`;
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = [
    `[data-motion="${name}"]:not(.motion-in) { opacity: 0; }`,
    `[data-motion="${name}"].motion-in {`,
    `  animation: ${preset.keyframes}`,
    `    var(--motion-duration, 600ms)`,
    `    cubic-bezier(0.4, 0, 0.2, 1)`,
    `    var(--motion-delay, 0ms)`,
    `    both;`,
    `}`,
  ].join("\n");
  document.head.appendChild(style);
}
