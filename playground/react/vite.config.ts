import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  server: { port: 3001 },
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
        find: /^viewmotion-react$/,
        replacement: fileURLToPath(
          new URL(
            "../../packages/viewmotion-react/src/index.ts",
            import.meta.url,
          ),
        ),
      },
    ],
  },
});
