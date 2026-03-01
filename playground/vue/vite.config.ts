import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue()],
  server: { port: 3002 },
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
        find: /^viewmotion-vue$/,
        replacement: fileURLToPath(
          new URL(
            "../../packages/viewmotion-vue/src/index.ts",
            import.meta.url,
          ),
        ),
      },
    ],
  },
});
