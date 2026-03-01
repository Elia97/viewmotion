import { describe, it, expect } from "vitest";
import { stagger } from "./stagger";

describe("stagger()", () => {
  it("returns empty config JSON when called with no args", () => {
    const result = stagger();
    expect(result).toEqual({ "data-stagger": "{}" });
  });

  it("includes delay when provided", () => {
    const result = stagger({ delay: 100 });
    expect(result["data-stagger"]).toContain('"delay":100');
  });

  it("includes step when provided", () => {
    const result = stagger({ step: 60 });
    expect(result["data-stagger"]).toContain('"step":60');
  });

  it("serialises all fields correctly", () => {
    const result = stagger({ delay: 80, step: 50 });
    const parsed = JSON.parse(result["data-stagger"]!);
    expect(parsed).toEqual({ delay: 80, step: 50 });
  });

  it("returns an object with only the data-stagger key", () => {
    const result = stagger({ delay: 0 });
    expect(Object.keys(result)).toEqual(["data-stagger"]);
  });
});
