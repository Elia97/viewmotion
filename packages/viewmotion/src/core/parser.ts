/**
 * Parser — extracts MotionConfig from raw data-motion attribute values.
 *
 * Pure function: no DOM access, no side effects.
 */

import type { MotionConfig } from "../types/public.js";
import type { ParseResult, ParsedStaggerConfig } from "../types/internal.js";
import { logger } from "../logger/index.js";

/**
 * Parse a raw data-motion attribute value into a MotionConfig.
 *
 * Expects a JSON object string: '{"preset":"fade-up","delay":100}'
 *
 * Returns a discriminated union:
 * - `{ ok: true, config }` on success
 * - `{ ok: false, error }` on failure
 */
export function parseMotionAttribute(raw: string): ParseResult {
  if (!raw || !raw.startsWith("{")) {
    const error = `data-motion must be a JSON object, e.g. data-motion='{"preset":"fade-up"}' — got: ${raw}`;
    logger.warn(error);
    return { ok: false, error };
  }

  try {
    const config = JSON.parse(raw) as MotionConfig;
    return { ok: true, config };
  } catch {
    const error = `Invalid JSON in data-motion: ${raw}`;
    logger.warn(error);
    return { ok: false, error };
  }
}

/**
 * Parse a raw data-stagger attribute value into a ParsedStaggerConfig.
 * Applies defaults for missing fields.
 */
export function parseStaggerAttribute(raw: string): ParsedStaggerConfig {
  const DEFAULT_DELAY = 0;
  const DEFAULT_STEP = 80;

  if (!raw) {
    return { delay: DEFAULT_DELAY, step: DEFAULT_STEP };
  }

  try {
    const parsed = JSON.parse(raw) as { delay?: number; step?: number };
    return {
      delay: parsed.delay ?? DEFAULT_DELAY,
      step: parsed.step ?? DEFAULT_STEP,
    };
  } catch {
    logger.warn("Invalid JSON in data-stagger:", raw);
    return { delay: DEFAULT_DELAY, step: DEFAULT_STEP };
  }
}
