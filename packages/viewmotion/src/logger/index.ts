/**
 * Controlled logging system for viewmotion.
 *
 * Replaces scattered console.warn/console.log calls with a centralized,
 * testable, and configurable logger.
 *
 * Usage:
 *   import { logger } from "../logger/index.js";
 *   logger.warn("Invalid config", raw);
 *
 * Configuration:
 *   import { setLogLevel } from "../logger/index.js";
 *   setLogLevel(LogLevel.SILENT); // disable all logging
 */

import { LogLevel } from "./levels.js";

let currentLevel: LogLevel = LogLevel.WARN;

/**
 * Set the global log level. Messages below this level are suppressed.
 */
export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

/**
 * Get the current log level.
 */
export function getLogLevel(): LogLevel {
  return currentLevel;
}

const PREFIX = "[viewmotion]";

export const logger = {
  error(...args: unknown[]): void {
    if (currentLevel >= LogLevel.ERROR) {
      console.error(PREFIX, ...args);
    }
  },

  warn(...args: unknown[]): void {
    if (currentLevel >= LogLevel.WARN) {
      console.warn(PREFIX, ...args);
    }
  },

  info(...args: unknown[]): void {
    if (currentLevel >= LogLevel.INFO) {
      console.info(PREFIX, ...args);
    }
  },

  debug(...args: unknown[]): void {
    if (currentLevel >= LogLevel.DEBUG) {
      console.debug(PREFIX, ...args);
    }
  },
} as const;
