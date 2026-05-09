import type { CodeLanguage } from "astro";

export const snippets: Record<string, { lang: CodeLanguage; code: string }> = {
  install: {
    lang: "bash",
    code: `npm install viewmotion`,
  },
  initialize: {
    lang: "ts",
    code: `import "viewmotion/styles.css";
import { initMotion } from "viewmotion";

await initMotion();`,
  },
  animate: {
    lang: "html",
    code: `<h1 data-motion='{ "preset": "fade-up" }'>
  Hello world
</h1>`,
  },
  vanilla: {
    lang: "html",
    code: `<script type="module">
  import "viewmotion/styles.css";
  import { initMotion } from "viewmotion";
  await initMotion();
</script>

<h1 data-motion='{ "preset": "fade-up" }'>
  Hello world
</h1>`,
  },
  react: {
    lang: "tsx",
    code: `import { useMotion } from "viewmotion-react";

function Hero() {
  const ref = useMotion({ preset: "fade-up" });

  return (
    <h1 ref={ref}>Hello</h1>
  );
}`,
  },
  vue: {
    lang: "vue",
    code: `<script setup>
import { vMotion } from "viewmotion-vue";
</script>

<template>
  <h1 v-motion="{ preset: 'fade-up' }">
    Hello
  </h1>
</template>`,
  },
  svelte: {
    lang: "svelte",
    code: `<script>
  import { motion } from "viewmotion-svelte";
</script>

<h1
  use:motion={{ preset: "fade-up" }}
>
  Hello
</h1>`,
  },
};
