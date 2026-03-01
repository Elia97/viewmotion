import Lenis from "lenis";
import type { LenisOptions } from "lenis";
import type { ScrollOptions } from "../types/public.js";

/**
 * Initialises Lenis smooth scroll and starts the internal RAF loop.
 * Returns the Lenis instance for advanced event listening or programmatic control.
 *
 * Called automatically by initMotion() unless smoothScroll: false is passed.
 */
export function initScroll(options?: ScrollOptions): Lenis {
  const lenis = new Lenis(options as LenisOptions);

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}
