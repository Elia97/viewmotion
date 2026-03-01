/**
 * Environment guards — pure functions, no side effects on import.
 */

/** True when running in a server environment (no window/document). */
export function isSSR(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

/** True when the user prefers reduced motion. Always false during SSR. */
export function isReducedMotion(): boolean {
  if (isSSR()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when the document is fully loaded (all resources). */
export function isDocumentLoaded(): boolean {
  if (isSSR()) return true;
  return document.readyState === "complete";
}

/**
 * Returns a promise that resolves when the window load event fires,
 * or immediately if the document is already fully loaded.
 */
export function waitForLoad(): Promise<void> {
  if (isSSR() || isDocumentLoaded()) return Promise.resolve();
  return new Promise((resolve) =>
    window.addEventListener("load", () => resolve(), { once: true }),
  );
}
