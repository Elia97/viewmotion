/**
 * Normalizer — applies defaults to produce a fully resolved config.
 *
 * Pure function: no DOM access, no side effects.
 */

import type { MotionConfig } from "../types/public.js";
import type {
  NormalizedMotionConfig,
  TimingDefaults,
} from "../types/internal.js";

/** Default timing values when neither element nor global options specify them. */
export const DEFAULT_TIMING: TimingDefaults = {
  duration: 600,
  delay: 0,
};

/**
 * Normalize a MotionConfig by filling in all defaults.
 *
 * Priority: element config > timing defaults > hardcoded defaults
 */
export function normalizeConfig(
  config: MotionConfig,
  defaults: TimingDefaults = DEFAULT_TIMING,
): NormalizedMotionConfig {
  return {
    preset: config.preset,
    delay: config.delay ?? defaults.delay,
    duration: config.duration ?? defaults.duration,
    once: config.once ?? false,
  };
}

/**
 * Extract timing defaults from MotionOptions.
 */
export function extractTimingDefaults(options?: {
  defaultDuration?: number;
  defaultDelay?: number;
}): TimingDefaults {
  return {
    duration: options?.defaultDuration ?? DEFAULT_TIMING.duration,
    delay: options?.defaultDelay ?? DEFAULT_TIMING.delay,
  };
}
