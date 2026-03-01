import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// We need to re-import observe fresh for each test to reset module-level state.
// Use dynamic import + vi.resetModules() to achieve this.
let observe: typeof import("./adapter").observe;

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IOCallback;
  observed: Set<Element> = new Set();

  constructor(callback: IOCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.add(el);
  }
  unobserve(el: Element) {
    this.observed.delete(el);
  }
  disconnect() {
    this.observed.clear();
  }
  trigger(el: Element, isIntersecting: boolean) {
    this.callback([
      { target: el, isIntersecting } as IntersectionObserverEntry,
    ]);
  }
}

function setMatchMedia(prefersReduced: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: prefersReduced,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }),
  });
}

beforeEach(async () => {
  document.body.innerHTML = "";
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  setMatchMedia(false);

  // Reset modules so the shared observer Map and WeakSet are fresh
  vi.resetModules();
  const mod = await import("./adapter");
  observe = mod.observe;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("observe()", () => {
  it("sets data attributes from config", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade-up", delay: 100, duration: 700, once: true });
    expect(el.dataset["motion"]).toBe("fade-up");
    expect(el.dataset["delay"]).toBe("100");
    expect(el.dataset["duration"]).toBe("700");
    expect(el.dataset["once"]).toBe("true");
  });

  it("sets CSS custom properties", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade-up", delay: 100, duration: 700 });
    expect(el.style.getPropertyValue("--motion-duration")).toBe("700ms");
    expect(el.style.getPropertyValue("--motion-delay")).toBe("100ms");
  });

  it("creates an observer and observes the element", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade-up" });
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0]!.observed.has(el)).toBe(true);
  });

  it("reveals element when observer triggers", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade-up" });
    const obs = MockIntersectionObserver.instances[0]!;
    obs.trigger(el, true);
    expect(el.classList.contains("motion-in")).toBe(true);
  });

  it("cleanup unobserves element and resets it", () => {
    const el = document.createElement("div");
    const cleanup = observe(el, { preset: "fade-up" });
    const obs = MockIntersectionObserver.instances[0]!;
    obs.trigger(el, true);
    expect(el.classList.contains("motion-in")).toBe(true);

    cleanup();
    expect(obs.observed.has(el)).toBe(false);
    expect(el.classList.contains("motion-in")).toBe(false);
  });

  it("reveals immediately with 0ms when prefers-reduced-motion", () => {
    setMatchMedia(true);
    const el = document.createElement("div");
    observe(el, { preset: "fade-up", delay: 200 });
    expect(el.classList.contains("motion-in")).toBe(true);
    expect(el.style.getPropertyValue("--motion-duration")).toBe("0ms");
    expect(el.style.getPropertyValue("--motion-delay")).toBe("0ms");
    // No observer created
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("uses default duration/delay when not specified", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade" });
    expect(el.style.getPropertyValue("--motion-duration")).toBe("600ms");
    expect(el.style.getPropertyValue("--motion-delay")).toBe("0ms");
  });

  it("uses options defaults when provided", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade" }, { defaultDuration: 900, defaultDelay: 50 });
    expect(el.style.getPropertyValue("--motion-duration")).toBe("900ms");
    expect(el.style.getPropertyValue("--motion-delay")).toBe("50ms");
  });

  it("shares a single observer for multiple elements with same options", () => {
    const el1 = document.createElement("div");
    const el2 = document.createElement("div");
    const el3 = document.createElement("div");
    observe(el1, { preset: "fade-up" });
    observe(el2, { preset: "slide-left" });
    observe(el3, { preset: "fade" });

    // All three should share the same observer instance
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const obs = MockIntersectionObserver.instances[0]!;
    expect(obs.observed.has(el1)).toBe(true);
    expect(obs.observed.has(el2)).toBe(true);
    expect(obs.observed.has(el3)).toBe(true);
  });

  it("creates separate observers for different options", () => {
    const el1 = document.createElement("div");
    const el2 = document.createElement("div");
    observe(el1, { preset: "fade-up" });
    observe(el2, { preset: "fade-up" }, { rootMargin: "0px", threshold: 0.5 });

    expect(MockIntersectionObserver.instances).toHaveLength(2);
  });

  it("prevents double-observe on the same element", () => {
    const el = document.createElement("div");
    observe(el, { preset: "fade-up" });
    observe(el, { preset: "fade-up" });

    // Should still only be observed once
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const obs = MockIntersectionObserver.instances[0]!;
    // The element should be in the observed set exactly once
    expect(obs.observed.size).toBe(1);
  });

  it("allows re-observe after cleanup", () => {
    const el = document.createElement("div");
    const cleanup1 = observe(el, { preset: "fade-up" });
    cleanup1();

    // Should be able to observe again
    observe(el, { preset: "fade-up" });
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const obs = MockIntersectionObserver.instances[0]!;
    expect(obs.observed.has(el)).toBe(true);
  });
});
