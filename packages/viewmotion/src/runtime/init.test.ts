import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { initMotion } from "../runtime/init";

// Mock the scroll module so Lenis is never instantiated in unit tests
vi.mock("./scroll.js", () => ({
  initScroll: vi.fn(() => ({ raf: vi.fn(), destroy: vi.fn(), on: vi.fn() })),
}));

// ─── IntersectionObserver mock ────────────────────────────────────────────

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

  /** Simulate an intersection entry for an element. */
  trigger(el: Element, isIntersecting: boolean) {
    this.callback([
      { target: el, isIntersecting } as IntersectionObserverEntry,
    ]);
  }
}

// ─── Setup / teardown ─────────────────────────────────────────────────────

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

function makeMotionEl(preset: string, inViewport = false): HTMLElement {
  const el = document.createElement("div");
  el.dataset["motion"] = JSON.stringify({ preset });
  document.body.appendChild(el);
  vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
    top: inViewport ? 100 : 2000,
    bottom: inViewport ? 200 : 2100,
    left: 0,
    right: 0,
    width: 100,
    height: 100,
    toJSON: () => ({}),
  } as DOMRect);
  return el;
}

beforeEach(() => {
  document.body.innerHTML = "";
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  setMatchMedia(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ─── Tests ────────────────────────────────────────────────────────────────

describe("initMotion()", () => {
  it("does nothing when no [data-motion] or [data-stagger] elements exist", async () => {
    await initMotion();
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("reveals all immediately when prefers-reduced-motion is set", async () => {
    setMatchMedia(true);
    const el = makeMotionEl("fade-up", false);
    await initMotion();
    expect(el.classList.contains("motion-in")).toBe(true);
    expect(el.style.getPropertyValue("--motion-duration")).toBe("0ms");
  });

  it("observes below-fold elements immediately", async () => {
    const el = makeMotionEl("fade-up", false);
    await initMotion();
    const observer = MockIntersectionObserver.instances[0]!;
    expect(observer.observed.has(el)).toBe(true);
  });

  it("reveals in-viewport elements after page load", async () => {
    // document.readyState is "complete" in happy-dom, so waitForLoad resolves immediately
    const el = makeMotionEl("fade-up", true);
    await initMotion();
    expect(el.classList.contains("motion-in")).toBe(true);
  });

  it("reveals element when observer triggers isIntersecting", async () => {
    const el = makeMotionEl("fade-up", false);
    await initMotion();
    const observer = MockIntersectionObserver.instances[0]!;
    observer.trigger(el, true);
    expect(el.classList.contains("motion-in")).toBe(true);
  });

  it("resets element when it leaves viewport (data-once not set)", async () => {
    const el = makeMotionEl("fade-up", false);
    await initMotion();
    const observer = MockIntersectionObserver.instances[0]!;
    observer.trigger(el, true);
    expect(el.classList.contains("motion-in")).toBe(true);
    observer.trigger(el, false);
    expect(el.classList.contains("motion-in")).toBe(false);
  });

  it("unobserves element after first reveal when once:true", async () => {
    const el = makeMotionEl("fade-up", false);
    el.dataset["once"] = "true";
    await initMotion();
    const observer = MockIntersectionObserver.instances[0]!;
    observer.trigger(el, true);
    expect(observer.observed.has(el)).toBe(false);
  });

  it("applies defaultDuration from options", async () => {
    const el = makeMotionEl("fade-up", false);
    await initMotion({ defaultDuration: 900 });
    expect(el.style.getPropertyValue("--motion-duration")).toBe("900ms");
  });

  it("applies defaultDelay from options", async () => {
    const el = makeMotionEl("fade-up", false);
    await initMotion({ defaultDelay: 200 });
    expect(el.style.getPropertyValue("--motion-delay")).toBe("200ms");
  });
});
