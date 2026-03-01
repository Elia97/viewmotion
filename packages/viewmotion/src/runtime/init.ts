import type Lenis from "lenis";
import type { MotionOptions, MotionCleanup } from "../types/public.js";
import { collectElements } from "../core/collector.js";
import { extractTimingDefaults } from "../core/normalizer.js";
import { cssEngine } from "../core/engine.js";
import {
  prepareElement,
  revealElement,
  revealAllImmediately,
} from "./lifecycle.js";
import { createObserver } from "./observer.js";
import { isSSR, isReducedMotion, waitForLoad } from "../utils/guards.js";

/**
 * Initialises the viewmotion reveal animation system.
 *
 * Collects all `[data-motion]` and `[data-stagger]` elements, sets up a
 * single `IntersectionObserver`, and reveals elements as they enter the
 * viewport via CSS animations.
 *
 * By default also enables Lenis smooth scroll — pass `{ smoothScroll: false }`
 * to opt out.
 *
 * Returns a cleanup handle:
 * - `scroll` — the Lenis instance (or `null` if smooth scroll is disabled).
 * - `destroy()` — disconnects the observer and (optionally) destroys Lenis.
 *   Call this in SPA route teardown to avoid memory leaks.
 *
 * **SSR-safe**: can be imported in server environments (Astro, Next.js, etc.).
 * The function is a no-op when `window` is not defined.
 *
 * @example
 * ```ts
 * import { initMotion } from 'viewmotion'
 *
 * const { destroy } = await initMotion({ smoothScroll: false })
 *
 * // Later, in cleanup:
 * destroy()
 * ```
 */
export async function initMotion(
  options?: MotionOptions,
): Promise<MotionCleanup> {
  // SSR guard — no-op on the server.
  if (isSSR()) return { scroll: null, destroy() {} };

  // Smooth scroll — dynamic import keeps Lenis out of SSR bundles.
  let scroll: Lenis | null = null;
  if (options?.smoothScroll !== false) {
    const { initScroll } = await import("./scroll.js");
    scroll = initScroll(options?.scroll);
  }

  const elements = collectElements();

  if (elements.length === 0) {
    return {
      scroll,
      destroy() {
        scroll?.destroy();
      },
    };
  }

  // Respect prefers-reduced-motion: reveal everything instantly,
  // skip observer creation entirely.
  if (isReducedMotion()) {
    revealAllImmediately(elements, cssEngine);
    return {
      scroll,
      destroy() {
        scroll?.destroy();
      },
    };
  }

  const defaults = extractTimingDefaults(options);

  const inViewport: HTMLElement[] = [];
  const belowFold: HTMLElement[] = [];

  for (const el of elements) {
    prepareElement(el, defaults, cssEngine);
    const { top, bottom } = el.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      inViewport.push(el);
    } else {
      belowFold.push(el);
    }
  }

  const observer = createObserver(options, cssEngine);

  if (inViewport.length > 0) {
    // Wait for full page load (fonts, images) before revealing hero elements
    await waitForLoad();

    for (const el of inViewport) {
      revealElement(el, cssEngine);
      if (el.dataset["once"] !== "true") observer.observe(el);
    }
  }

  for (const el of belowFold) observer.observe(el);

  return {
    scroll,
    destroy() {
      observer.disconnect();
      scroll?.destroy();
    },
  };
}
