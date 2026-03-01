/**
 * Validator — validates MotionConfig values.
 *
 * Pure function: no DOM access, no side effects.
 */

import type { MotionConfig } from "../types/public.js";
import { PRESETS } from "./registry.js";
import { logger } from "../logger/index.js";

/**
 * Validation result — either ok or a list of warnings.
 * Validation is lenient: it warns but doesn't block execution.
 */
export interface ValidationResult {
  readonly valid: boolean;
  readonly warnings: readonly string[];
}

/**
 * Validate a MotionConfig. Returns warnings for unknown presets
 * or out-of-range values. Does NOT throw — caller decides behavior.
 */
export function validateConfig(config: MotionConfig): ValidationResult {
  const warnings: string[] = [];

  if (!config.preset) {
    warnings.push("Missing required field: preset");
  } else if (!PRESETS[config.preset]) {
    warnings.push(
      `Unknown preset "${config.preset}". ` +
        `Available: ${Object.keys(PRESETS).join(", ")}. ` +
        `Register custom presets with registerPreset().`,
    );
  }

  if (config.delay !== undefined && config.delay < 0) {
    warnings.push(`Negative delay (${config.delay}ms) — will be treated as 0`);
  }

  if (config.duration !== undefined && config.duration < 0) {
    warnings.push(
      `Negative duration (${config.duration}ms) — will be treated as 0`,
    );
  }

  for (const w of warnings) {
    logger.warn(w);
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}
