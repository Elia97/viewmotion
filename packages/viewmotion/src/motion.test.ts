import { describe, it, expect } from "vitest";
import { motion } from "./motion";

describe("motion()", () => {
  it("serialises preset to JSON data-motion attribute", () => {
    const result = motion({ preset: "fade-up" });
    expect(result).toEqual({ "data-motion": '{"preset":"fade-up"}' });
  });

  it("includes delay when provided", () => {
    const result = motion({ preset: "fade-up", delay: 100 });
    expect(result["data-motion"]).toContain('"delay":100');
  });

  it("includes duration when provided", () => {
    const result = motion({ preset: "scale-in", duration: 700 });
    expect(result["data-motion"]).toContain('"duration":700');
  });

  it("includes once:true when provided", () => {
    const result = motion({ preset: "fade", once: true });
    expect(result["data-motion"]).toContain('"once":true');
  });

  it("serialises all fields correctly", () => {
    const result = motion({
      preset: "slide-left",
      delay: 200,
      duration: 500,
      once: false,
    });
    const parsed = JSON.parse(result["data-motion"]!);
    expect(parsed).toEqual({
      preset: "slide-left",
      delay: 200,
      duration: 500,
      once: false,
    });
  });

  it("returns an object with only the data-motion key", () => {
    const result = motion({ preset: "fade" });
    expect(Object.keys(result)).toEqual(["data-motion"]);
  });
});
