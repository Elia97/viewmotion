import { describe, it, expect } from "vitest";
import { CSSAnimationEngine, cssEngine } from "../core/engine";

describe("CSSAnimationEngine", () => {
  it("is a singleton instance", () => {
    expect(cssEngine).toBeInstanceOf(CSSAnimationEngine);
  });

  describe("prepare()", () => {
    it("sets --motion-duration and --motion-delay", () => {
      const el = document.createElement("div");
      cssEngine.prepare(el, {
        preset: "fade-up",
        delay: 100,
        duration: 700,
        once: false,
      });
      expect(el.style.getPropertyValue("--motion-duration")).toBe("700ms");
      expect(el.style.getPropertyValue("--motion-delay")).toBe("100ms");
    });

    it("sets 0ms for zero values", () => {
      const el = document.createElement("div");
      cssEngine.prepare(el, {
        preset: "fade",
        delay: 0,
        duration: 0,
        once: false,
      });
      expect(el.style.getPropertyValue("--motion-duration")).toBe("0ms");
      expect(el.style.getPropertyValue("--motion-delay")).toBe("0ms");
    });
  });

  describe("reveal()", () => {
    it("adds .motion-in class", () => {
      const el = document.createElement("div");
      cssEngine.reveal(el);
      expect(el.classList.contains("motion-in")).toBe(true);
    });

    it("is idempotent", () => {
      const el = document.createElement("div");
      cssEngine.reveal(el);
      cssEngine.reveal(el);
      expect(el.classList.length).toBe(1);
    });
  });

  describe("reset()", () => {
    it("removes .motion-in class", () => {
      const el = document.createElement("div");
      el.classList.add("motion-in");
      cssEngine.reset(el);
      expect(el.classList.contains("motion-in")).toBe(false);
    });

    it("is safe to call on element without .motion-in", () => {
      const el = document.createElement("div");
      cssEngine.reset(el);
      expect(el.classList.contains("motion-in")).toBe(false);
    });
  });

  describe("revealImmediate()", () => {
    it("sets 0ms timing and adds .motion-in", () => {
      const el = document.createElement("div");
      cssEngine.revealImmediate(el);
      expect(el.style.getPropertyValue("--motion-duration")).toBe("0ms");
      expect(el.style.getPropertyValue("--motion-delay")).toBe("0ms");
      expect(el.classList.contains("motion-in")).toBe(true);
    });
  });
});
