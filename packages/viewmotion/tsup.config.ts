import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/adapter.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  treeshake: true,
  target: "es2020",
  external: ["lenis"],
  // Copy styles.css to dist after build
  onSuccess: "cp src/styles.css dist/styles.css",
});
