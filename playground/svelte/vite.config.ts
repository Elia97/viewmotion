import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [svelte()],
  server: { port: 3003 },
  resolve: {
    alias: [
      {
        find: "viewmotion/adapter",
        replacement: fileURLToPath(
          new URL("../../packages/viewmotion/src/adapter.ts", import.meta.url),
        ),
      },
      {
        find: "viewmotion/styles.css",
        replacement: fileURLToPath(
          new URL("../../packages/viewmotion/src/styles.css", import.meta.url),
        ),
      },
      {
        find: /^viewmotion$/,
        replacement: fileURLToPath(
          new URL("../../packages/viewmotion/src/index.ts", import.meta.url),
        ),
      },
      {
        find: /^viewmotion-svelte$/,
        replacement: fileURLToPath(
          new URL(
            "../../packages/viewmotion-svelte/src/index.ts",
            import.meta.url,
          ),
        ),
      },
    ],
  },
});
