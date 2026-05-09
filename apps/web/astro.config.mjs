// @ts-nocheck
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import icon from "astro-icon"
import mdx from "@astrojs/mdx"
import rehypeSlug from "rehype-slug"

// https://astro.build/config
export default defineConfig({
  site: "https://viewmotion.vercel.app",

  compressHTML: true,

  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["lenis", "viewmotion", "viewmotion/adapter"],
    },
    ssr: {
      noExternal: ["viewmotion", "lenis"],
    },
  },

  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
    rehypePlugins: [rehypeSlug],
  },

  integrations: [react(), icon(), mdx()],
})
