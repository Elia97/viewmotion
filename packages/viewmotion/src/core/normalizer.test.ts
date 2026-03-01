import { describe, it, expect } from "vitest";
import {
  normalizeConfig,
  extractTimingDefaults,
  DEFAULT_TIMING,
} from "../core/normalizer";

// ─── normalizeConfig ───────────────────────────────────────────────────────

describe("normalizeConfig()", () => {
  it("fills in all defaults for minimal config", () => {
    const result = normalizeConfig({ preset: "fade-up" });
    expect(result).toEqual({
      preset: "fade-up",
      delay: 0,
      duration: 600,
      once: false,
    });
  });

  it("preserves explicit values", () => {
    const result = normalizeConfig({
      preset: "slide-left",
      delay: 200,
      duration: 900,
      once: true,
    });
    expect(result).toEqual({
      preset: "slide-left",
      delay: 200,
      duration: 900,
      once: true,
    });
  });

  it("uses custom timing defaults", () => {
    const result = normalizeConfig(
      { preset: "fade" },
      { duration: 800, delay: 50 },
    );
    expect(result).toEqual({
      preset: "fade",
      delay: 50,
      duration: 800,
      once: false,
    });
  });

  it("config values override custom defaults", () => {
    const result = normalizeConfig(
      { preset: "fade", delay: 100, duration: 500 },
      { duration: 800, delay: 50 },
    );
    expect(result).toEqual({
      preset: "fade",
      delay: 100,
      duration: 500,
      once: false,
    });
  });

  it("returns readonly-compatible object", () => {
    const result = normalizeConfig({ preset: "fade" });
    // Verify all fields are present (compile-time readonly check)
    expect(result.preset).toBe("fade");
    expect(result.delay).toBe(0);
    expect(result.duration).toBe(600);
    expect(result.once).toBe(false);
  });
});

// ─── extractTimingDefaults ─────────────────────────────────────────────────

describe("extractTimingDefaults()", () => {
  it("returns hardcoded defaults when no options provided", () => {
    const result = extractTimingDefaults();
    expect(result).toEqual(DEFAULT_TIMING);
  });

  it("returns hardcoded defaults for empty options", () => {
    const result = extractTimingDefaults({});
    expect(result).toEqual(DEFAULT_TIMING);
  });

  it("extracts custom duration", () => {
    const result = extractTimingDefaults({ defaultDuration: 900 });
    expect(result).toEqual({ duration: 900, delay: 0 });
  });

  it("extracts custom delay", () => {
    const result = extractTimingDefaults({ defaultDelay: 200 });
    expect(result).toEqual({ duration: 600, delay: 200 });
  });

  it("extracts both", () => {
    const result = extractTimingDefaults({
      defaultDuration: 800,
      defaultDelay: 100,
    });
    expect(result).toEqual({ duration: 800, delay: 100 });
  });
});
