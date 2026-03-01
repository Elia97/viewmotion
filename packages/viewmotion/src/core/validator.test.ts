import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateConfig } from "../core/validator";
import { PRESETS } from "../core/registry";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("validateConfig()", () => {
  it("returns valid for known preset", () => {
    const result = validateConfig({ preset: "fade-up" });
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("returns valid for all built-in presets", () => {
    for (const name of Object.keys(PRESETS)) {
      const result = validateConfig({ preset: name });
      expect(result.valid).toBe(true);
    }
  });

  it("warns for unknown preset", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = validateConfig({ preset: "unknown-preset" });
    expect(result.valid).toBe(false);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain("Unknown preset");
    expect(warn).toHaveBeenCalledOnce();
  });

  it("warns for missing preset", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = validateConfig({ preset: "" });
    expect(result.valid).toBe(false);
    expect(result.warnings[0]).toContain("Missing required field");
    expect(warn).toHaveBeenCalledOnce();
  });

  it("warns for negative delay", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = validateConfig({ preset: "fade-up", delay: -100 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some((w) => w.includes("Negative delay"))).toBe(
      true,
    );
    expect(warn).toHaveBeenCalled();
  });

  it("warns for negative duration", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = validateConfig({ preset: "fade-up", duration: -50 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some((w) => w.includes("Negative duration"))).toBe(
      true,
    );
    expect(warn).toHaveBeenCalled();
  });

  it("allows zero delay and duration", () => {
    const result = validateConfig({
      preset: "fade-up",
      delay: 0,
      duration: 0,
    });
    expect(result.valid).toBe(true);
  });

  it("validates config with all valid fields", () => {
    const result = validateConfig({
      preset: "fade-up",
      delay: 100,
      duration: 700,
      once: true,
    });
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });
});
