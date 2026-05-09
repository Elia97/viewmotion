/**
 * Animation Engine — abstracts the animation backend.
 *
 * Implements the AnimationEngine interface using CSS @keyframes animations.
 * This decouples the core from any specific animation library.
 *
 * Future alternative implementations:
 * - WebAnimationsAPIEngine
 * - MotionOneEngine
 */

import type {
  AnimationEngine,
  NormalizedMotionConfig,
} from "../types/internal.js";

/**
 * CSS Animation Engine — uses CSS @keyframes + class toggle.
 *
 * - `prepare()` sets CSS custom properties for timing
 * - `reveal()` adds `.motion-in` class to trigger animation
 * - `reset()` removes `.motion-in` for repeat animations
 * - `revealImmediate()` reveals with 0ms animation (prefers-reduced-motion)
 */
export class CSSAnimationEngine implements AnimationEngine {
  prepare(el: HTMLElement, config: NormalizedMotionConfig): void {
    el.style.setProperty("--motion-duration", `${config.duration}ms`);
    el.style.setProperty("--motion-delay", `${config.delay}ms`);
  }

  reveal(el: HTMLElement): void {
    el.classList.add("motion-in");
  }

  reset(el: HTMLElement): void {
    el.classList.remove("motion-in");
  }

  revealImmediate(el: HTMLElement): void {
    el.style.setProperty("--motion-duration", "0ms");
    el.style.setProperty("--motion-delay", "0ms");
    el.classList.add("motion-in");
  }
}

/** Singleton instance — since CSSAnimationEngine is stateless. */
export const cssEngine = new CSSAnimationEngine();
