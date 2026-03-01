import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: {
      "viewmotion": fileURLToPath(
        new URL("../../packages/viewmotion/src/index.ts", import.meta.url),
      ),
    },
  },
});
