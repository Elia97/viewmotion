/**
 * Contract tests — verify that the public API produces stable output.
 *
 * These tests snapshot the public API behavior to catch accidental
 * breaking changes during refactoring.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { motion } from "../motion";
import { stagger } from "../stagger";
import { registerPreset } from "../core/registry";
import { PRESETS } from "../core/registry";

beforeEach(() => {
  vi.restoreAllMocks();
  // Clean up injected style tags between tests
  document
    .querySelectorAll("style[id^='wm-preset-']")
    .forEach((el) => el.remove());
});

describe("Contract: motion() output", () => {
  it("produces stable JSON output for all built-in presets", () => {
    const presets = [
      "fade",
      "fade-up",
      "fade-down",
      "slide-left",
      "slide-right",
      "scale-in",
      "zoom-out",
      "blur-in",
    ];

    for (const preset of presets) {
      const result = motion({ preset });
      const parsed = JSON.parse(result["data-motion"]!);
      expect(parsed).toEqual({ preset });
    }
  });

  it("motion() output is always a single-key object", () => {
    const result = motion({
      preset: "fade-up",
      delay: 100,
      duration: 700,
      once: true,
    });
    expect(Object.keys(result)).toEqual(["data-motion"]);
  });

  it("motion() serializes all config fields", () => {
    const result = motion({
      preset: "fade-up",
      delay: 100,
      duration: 700,
      once: true,
    });
    const parsed = JSON.parse(result["data-motion"]!);
    expect(parsed).toMatchSnapshot();
  });
});

describe("Contract: stagger() output", () => {
  it("stagger() output is always a single-key object", () => {
    const result = stagger({ delay: 100, step: 60 });
    expect(Object.keys(result)).toEqual(["data-stagger"]);
  });

  it("stagger() empty call produces empty JSON object", () => {
    const result = stagger();
    expect(result["data-stagger"]).toBe("{}");
  });

  it("stagger() serializes config correctly", () => {
    const result = stagger({ delay: 80, step: 50 });
    const parsed = JSON.parse(result["data-stagger"]!);
    expect(parsed).toMatchSnapshot();
  });
});

describe("Contract: built-in presets are stable", () => {
  it("all expected presets exist", () => {
    const expectedPresets = [
      "fade",
      "fade-up",
      "fade-down",
      "slide-left",
      "slide-right",
      "scale-in",
      "zoom-out",
      "blur-in",
    ];
    for (const name of expectedPresets) {
      expect(PRESETS[name]).toBeDefined();
      expect(PRESETS[name]!.keyframes).toBeTruthy();
    }
  });

  it("preset keyframes mapping is stable", () => {
    const mapping = Object.entries(PRESETS).map(([name, preset]) => ({
      name,
      keyframes: preset.keyframes,
    }));
    expect(mapping).toMatchSnapshot();
  });
});

describe("Contract: registerPreset() behavior", () => {
  it("registered preset appears in PRESETS map", () => {
    registerPreset("test-flip", { keyframes: "my-flip" });
    expect(PRESETS["test-flip"]).toEqual({ keyframes: "my-flip" });
  });

  it("registered preset gets CSS injected", () => {
    registerPreset("test-spin", { keyframes: "my-spin" });
    const style = document.getElementById("wm-preset-test-spin");
    expect(style).not.toBeNull();
    expect(style!.textContent).toContain('[data-motion="test-spin"]');
    expect(style!.textContent).toContain("my-spin");
  });
});
