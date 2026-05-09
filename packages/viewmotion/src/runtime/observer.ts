import type { MotionOptions } from "../types/public.js";
import type { AnimationEngine, ObserverConfig } from "../types/internal.js";
import { revealElement, resetElement } from "./lifecycle.js";
import { cssEngine } from "../core/engine.js";

/** Default observer config values. */
const DEFAULT_ROOT_MARGIN = "0px 0px -60px 0px";
const DEFAULT_THRESHOLD = 0.1;

/**
 * Extract observer config from MotionOptions, applying defaults.
 */
export function extractObserverConfig(options?: MotionOptions): ObserverConfig {
  return {
    rootMargin: options?.rootMargin ?? DEFAULT_ROOT_MARGIN,
    threshold: options?.threshold ?? DEFAULT_THRESHOLD,
  };
}

/**
 * Creates a single IntersectionObserver that handles all [data-motion]
 * elements — both entrance (reveal) and exit (reset for repeat animations).
 *
 * data-once="true":  animate once, then unobserve.
 * data-once="false": animate every time the element enters the viewport.
 */
export function createObserver(
  options?: MotionOptions,
  engine: AnimationEngine = cssEngine,
): IntersectionObserver {
  const config = extractObserverConfig(options);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const once = el.dataset["once"] === "true";

        if (entry.isIntersecting) {
          revealElement(el, engine);
          if (once) observer.unobserve(el);
        } else {
          resetElement(el, engine);
        }
      }
    },
    {
      rootMargin: config.rootMargin,
      threshold: config.threshold,
    },
  );

  return observer;
}
