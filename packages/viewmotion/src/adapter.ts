import type { MotionConfig, MotionOptions } from "./types/public.js";
import { normalizeConfig, extractTimingDefaults } from "./core/normalizer.js";
import { cssEngine } from "./core/engine.js";
import { revealElement, resetElement } from "./runtime/lifecycle.js";
import { createObserver } from "./runtime/observer.js";
import { isSSR, isReducedMotion } from "./utils/guards.js";

/** Tracks elements already being observed to prevent double-observe. */
const observed = new WeakSet<HTMLElement>();

/** Shared observers keyed by serialized options. */
const observers = new Map<string, IntersectionObserver>();

function serializeOptions(options?: MotionOptions): string {
  const rootMargin = options?.rootMargin ?? "0px 0px -60px 0px";
  const threshold = options?.threshold ?? 0.1;
  return `${rootMargin}|${threshold}`;
}

function getSharedObserver(options?: MotionOptions): IntersectionObserver {
  const key = serializeOptions(options);
  let observer = observers.get(key);
  if (!observer) {
    observer = createObserver(options, cssEngine);
    observers.set(key, observer);
  }
  return observer;
}

/**
 * Observes a single DOM element for viewport entry and triggers its reveal
 * animation. Returns a cleanup function that unobserves the element.
 *
 * This is the low-level API designed for framework adapters (React, Vue,
 * Svelte). For static HTML pages, use `initMotion()` instead.
 *
 * Uses a shared IntersectionObserver per unique set of options for efficiency.
 * Safe to call multiple times on the same element (e.g. React StrictMode) —
 * the second call is a no-op that returns a cleanup for the existing observation.
 *
 * @example
 * ```ts
 * import { observe } from "viewmotion/adapter"
 *
 * const cleanup = observe(el, { preset: "fade-up", delay: 100, once: true })
 *
 * // On unmount:
 * cleanup()
 * ```
 */
export function observe(
  el: HTMLElement,
  config: MotionConfig,
  options?: MotionOptions,
): () => void {
  if (isSSR()) return () => {};

  // Write config directly as data attributes (skip JSON round-trip)
  el.dataset["motion"] = config.preset;
  if (config.delay !== undefined) el.dataset["delay"] = String(config.delay);
  if (config.duration !== undefined)
    el.dataset["duration"] = String(config.duration);
  if (config.once !== undefined) el.dataset["once"] = String(config.once);

  // Respect prefers-reduced-motion
  if (isReducedMotion()) {
    cssEngine.revealImmediate(el);
    return () => {};
  }

  // Normalize config with timing defaults
  const defaults = extractTimingDefaults(options);
  const normalized = normalizeConfig(config, defaults);

  // Set CSS custom properties via engine
  cssEngine.prepare(el, normalized);

  // Guard against double-observe (e.g. React StrictMode)
  if (observed.has(el)) {
    return () => {
      const observer = getSharedObserver(options);
      observer.unobserve(el);
      observed.delete(el);
      resetElement(el, cssEngine);
    };
  }

  // Use a shared observer for efficiency
  const observer = getSharedObserver(options);
  observer.observe(el);
  observed.add(el);

  return () => {
    observer.unobserve(el);
    observed.delete(el);
    resetElement(el, cssEngine);
  };
}

export type { MotionConfig, MotionOptions };
