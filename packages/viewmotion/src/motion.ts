import type { MotionConfig } from "./types/public.js";

/**
 * Returns a data-motion attribute object from a MotionConfig.
 *
 * Designed for use with frameworks that support attribute spreading:
 *
 * @example
 * // Astro / HTML template
 * <div {...motion({ preset: 'fade-up', delay: 100, duration: 700 })}>
 *
 * // Vue
 * <div v-bind="motion({ preset: 'fade-up', delay: 100 })">
 *
 * // Vanilla JS
 * Object.assign(el.dataset, motion({ preset: 'fade-up' }))
 */
export function motion(config: MotionConfig): Record<string, string> {
  return { "data-motion": JSON.stringify(config) };
}
