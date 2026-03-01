/**
 * Internal types used within the viewmotion implementation.
 *
 * NOT part of the public API — may change without notice.
 */

import type { MotionConfig, MotionOptions } from "./public.js";

/**
 * Fully resolved MotionConfig with all defaults applied.
 * Every field is required and defined — no optional values.
 */
export interface NormalizedMotionConfig {
  readonly preset: string;
  readonly delay: number;
  readonly duration: number;
  readonly once: boolean;
}

/**
 * Fully resolved timing defaults extracted from MotionOptions.
 */
export interface TimingDefaults {
  readonly duration: number;
  readonly delay: number;
}

/**
 * Fully resolved observer options extracted from MotionOptions.
 */
export interface ObserverConfig {
  readonly rootMargin: string;
  readonly threshold: number;
}

/**
 * Result of parsing a data-motion attribute.
 * `ok: true` means the parse succeeded, `ok: false` means it failed.
 */
export type ParseResult =
  | { readonly ok: true; readonly config: MotionConfig }
  | { readonly ok: false; readonly error: string };

/**
 * Parsed stagger config from data-stagger attribute.
 */
export interface ParsedStaggerConfig {
  readonly delay: number;
  readonly step: number;
}

/**
 * Animation engine interface — abstracts the animation backend.
 *
 * Current implementation: CSS @keyframes animations.
 * Future: Web Animations API, Motion One, etc.
 */
export interface AnimationEngine {
  /** Set CSS custom properties for timing on an element. */
  prepare(el: HTMLElement, config: NormalizedMotionConfig): void;
  /** Trigger the reveal animation. */
  reveal(el: HTMLElement): void;
  /** Reset the element to its pre-reveal state. */
  reset(el: HTMLElement): void;
  /** Instantly reveal with no animation (prefers-reduced-motion). */
  revealImmediate(el: HTMLElement): void;
}

// Re-export public types used internally
export type { MotionConfig, MotionOptions };
