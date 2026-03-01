import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseMotionAttribute, parseStaggerAttribute } from "../core/parser";

beforeEach(() => {
  vi.restoreAllMocks();
});

// ─── parseMotionAttribute ──────────────────────────────────────────────────

describe("parseMotionAttribute()", () => {
  it("parses valid JSON into MotionConfig", () => {
    const result = parseMotionAttribute('{"preset":"fade-up"}');
    expect(result).toEqual({ ok: true, config: { preset: "fade-up" } });
  });

  it("parses JSON with all fields", () => {
    const result = parseMotionAttribute(
      '{"preset":"slide-left","delay":200,"duration":500,"once":true}',
    );
    expect(result).toEqual({
      ok: true,
      config: { preset: "slide-left", delay: 200, duration: 500, once: true },
    });
  });

  it("returns error for plain string (not JSON)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = parseMotionAttribute("fade-up");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("data-motion must be a JSON object");
    }
    expect(warn).toHaveBeenCalledOnce();
  });

  it("returns error for empty string", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = parseMotionAttribute("");
    expect(result.ok).toBe(false);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("returns error for invalid JSON", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = parseMotionAttribute("{not-valid-json");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Invalid JSON");
    }
    expect(warn).toHaveBeenCalledOnce();
  });

  it("parses JSON with only preset (minimal config)", () => {
    const result = parseMotionAttribute('{"preset":"fade"}');
    expect(result).toEqual({ ok: true, config: { preset: "fade" } });
  });
});

// ─── parseStaggerAttribute ─────────────────────────────────────────────────

describe("parseStaggerAttribute()", () => {
  it("returns defaults for empty string", () => {
    const result = parseStaggerAttribute("");
    expect(result).toEqual({ delay: 0, step: 80 });
  });

  it("parses delay from JSON", () => {
    const result = parseStaggerAttribute('{"delay":100}');
    expect(result).toEqual({ delay: 100, step: 80 });
  });

  it("parses step from JSON", () => {
    const result = parseStaggerAttribute('{"step":50}');
    expect(result).toEqual({ delay: 0, step: 50 });
  });

  it("parses both delay and step", () => {
    const result = parseStaggerAttribute('{"delay":100,"step":60}');
    expect(result).toEqual({ delay: 100, step: 60 });
  });

  it("returns defaults for invalid JSON", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = parseStaggerAttribute("{bad");
    expect(result).toEqual({ delay: 0, step: 80 });
    expect(warn).toHaveBeenCalledOnce();
  });
});
