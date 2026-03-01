/**
 * Public types exported by the viewmotion package.
 *
 * These types form the stable public API contract.
 * Do NOT add internal-only fields here.
 */

/**
 * Options for initMotion()
 */
export interface MotionOptions {
  /** IntersectionObserver root margin (default: "0px 0px -60px 0px") */
  readonly rootMargin?: string;
  /** IntersectionObserver threshold (default: 0.1) */
  readonly threshold?: number;
  /** Default transition duration in ms for all elements (default: 600) */
  readonly defaultDuration?: number;
  /** Default transition delay in ms for all elements (default: 0) */
  readonly defaultDelay?: number;
  /**
   * Enable Lenis smooth scroll (default: true).
   * Pass false to disable if you manage your own scroll library.
   */
  readonly smoothScroll?: boolean;
  /** Options forwarded to the Lenis constructor. Only used when smoothScroll !== false. */
  readonly scroll?: ScrollOptions;
}

/**
 * Subset of Lenis constructor options exposed at the viewmotion level.
 * All fields are optional — sensible defaults are applied by Lenis.
 * @see https://lenis.darkroom.engineering
 */
export interface ScrollOptions {
  /** Linear interpolation intensity 0–1 (default: 0.075) */
  readonly lerp?: number;
  /** Animation easing function */
  readonly easing?: (t: number) => number;
  /** Smooth wheel events (default: true) */
  readonly smoothWheel?: boolean;
  /** Scroll direction (default: "vertical") */
  readonly orientation?: "vertical" | "horizontal";
  /** Multiplier applied to wheel delta (default: 1) */
  readonly wheelMultiplier?: number;
  /** Multiplier applied to touch delta (default: 2) */
  readonly touchMultiplier?: number;
  /** Enable infinite scroll (default: false) */
  readonly infinite?: boolean;
}

/**
 * Defines an animation preset.
 * `keyframes` must match a CSS @keyframes name defined in your stylesheet.
 */
export interface MotionPreset {
  /** CSS @keyframes name to play when the element is revealed */
  readonly keyframes: string;
}

/**
 * Config object for the motion() helper and the data-motion JSON attribute.
 */
export interface MotionConfig {
  /** Animation preset name (e.g. "fade-up", "slide-left") */
  readonly preset: string;
  /** Delay in ms before the animation starts */
  readonly delay?: number;
  /** Duration of the animation in ms */
  readonly duration?: number;
  /** Animate only once (default: false — repeats on every viewport entry) */
  readonly once?: boolean;
}

/**
 * Handle returned by `initMotion()`.
 */
export interface MotionCleanup {
  /**
   * The Lenis smooth-scroll instance, or `null` when smooth scroll is
   * disabled or `lenis` is not installed.
   */
  readonly scroll: unknown;
  /** Disconnect the observer and destroy the scroll instance. */
  destroy(): void;
}

/**
 * Config object for the stagger() helper and the data-stagger JSON attribute.
 */
export interface StaggerConfig {
  /** Base delay in ms before the first child animates (default: 0) */
  readonly delay?: number;
  /** Step in ms between each child's delay (default: 80) */
  readonly step?: number;
}
