import type { StaggerConfig } from "./types/public.js";
export type { StaggerConfig };

/**
 * Returns a data-stagger attribute object from a StaggerConfig.
 *
 * Designed for use with frameworks that support attribute spreading:
 *
 * @example
 * // Astro / HTML template
 * <ul {...stagger({ delay: 100 })}>
 *   <li {...motion({ preset: 'fade-up' })}>…</li>
 * </ul>
 *
 * // Vue
 * <ul v-bind="stagger({ delay: 100 })">
 *
 * // Vanilla JS
 * Object.assign(el.dataset, stagger({ delay: 80, step: 60 }))
 */
export function stagger(config: StaggerConfig = {}): Record<string, string> {
  return { "data-stagger": JSON.stringify(config) };
}
