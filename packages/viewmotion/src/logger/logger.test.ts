import { describe, it, expect, vi, beforeEach } from "vitest";
import { logger, setLogLevel, getLogLevel } from "../logger/index";
import { LogLevel } from "../logger/levels";

beforeEach(() => {
  vi.restoreAllMocks();
  setLogLevel(LogLevel.WARN); // reset to default
});

describe("logger", () => {
  it("logs warnings at WARN level", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.warn("test warning");
    expect(warn).toHaveBeenCalledWith("[viewmotion]", "test warning");
  });

  it("logs errors at WARN level", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    logger.error("test error");
    expect(error).toHaveBeenCalledWith("[viewmotion]", "test error");
  });

  it("suppresses info at WARN level", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("test info");
    expect(info).not.toHaveBeenCalled();
  });

  it("suppresses debug at WARN level", () => {
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});
    logger.debug("test debug");
    expect(debug).not.toHaveBeenCalled();
  });

  it("logs info at INFO level", () => {
    setLogLevel(LogLevel.INFO);
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("test info");
    expect(info).toHaveBeenCalledWith("[viewmotion]", "test info");
  });

  it("logs debug at DEBUG level", () => {
    setLogLevel(LogLevel.DEBUG);
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});
    logger.debug("test debug");
    expect(debug).toHaveBeenCalledWith("[viewmotion]", "test debug");
  });

  it("suppresses all at SILENT level", () => {
    setLogLevel(LogLevel.SILENT);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    logger.warn("nope");
    logger.error("nope");
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it("getLogLevel returns current level", () => {
    expect(getLogLevel()).toBe(LogLevel.WARN);
    setLogLevel(LogLevel.DEBUG);
    expect(getLogLevel()).toBe(LogLevel.DEBUG);
  });
});
