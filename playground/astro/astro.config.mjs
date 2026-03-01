// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  server: { port: 4000 },
  vite: {
    resolve: {
      alias: [
        // Exact match — resolves `import ... from "viewmotion"` to the local source
        {
          find: /^viewmotion$/,
          replacement: fileURLToPath(
            new URL("../../packages/viewmotion/src/index.ts", import.meta.url),
          ),
        },
      ],
    },

    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});