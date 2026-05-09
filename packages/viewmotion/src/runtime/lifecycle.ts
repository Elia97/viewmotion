/**
 * Lifecycle — element state transitions (prepare, reveal, reset).
 *
 * Thin wrappers that delegate to the AnimationEngine.
 * Kept as standalone functions for backward compatibility with
 * existing runtime code that uses them directly.
 */

import type {
  NormalizedMotionConfig,
  AnimationEngine,
} from "../types/internal.js";
import { cssEngine } from "../core/engine.js";

/**
 * Sets CSS custom properties for transition timing on an element.
 * Per-element data attributes override the provided defaults.
 */
export function prepareElement(
  el: HTMLElement,
  defaults: { duration: number; delay: number },
  engine: AnimationEngine = cssEngine,
): void {
  const duration = Number(el.dataset["duration"] ?? defaults.duration);
  const delay = Number(el.dataset["delay"] ?? defaults.delay);

  engine.prepare(el, {
    preset: el.dataset["motion"] ?? "",
    delay,
    duration,
    once: el.dataset["once"] === "true",
  });
}

/** Reveals an element by triggering the animation engine. */
export function revealElement(
  el: HTMLElement,
  engine: AnimationEngine = cssEngine,
): void {
  engine.reveal(el);
}

/**
 * Resets an element to its hidden state.
 * Used for data-once="false" elements so they animate again on re-entry.
 */
export function resetElement(
  el: HTMLElement,
  engine: AnimationEngine = cssEngine,
): void {
  engine.reset(el);
}

/** Reveals all elements immediately (prefers-reduced-motion). */
export function revealAllImmediately(
  elements: readonly HTMLElement[],
  engine: AnimationEngine = cssEngine,
): void {
  for (const el of elements) {
    engine.revealImmediate(el);
  }
}
