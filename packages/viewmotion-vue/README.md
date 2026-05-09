# viewmotion-vue

Vue adapter for [viewmotion](https://github.com/Elia97/viewmotion) — a minimal reveal animation system for landing pages.

## Install

```bash
npm install viewmotion viewmotion-vue
```

## Setup

Import the stylesheet once at your app entry point:

```ts
import "viewmotion/styles.css";
```

## Usage

### `v-motion` directive

```vue
<script setup>
import { vMotion } from "viewmotion-vue";
</script>

<template>
  <div v-motion="{ preset: 'fade-up', delay: 100, once: true }">Hello</div>
</template>
```

### `useMotion` composable

```vue
<script setup>
import { useMotion } from "viewmotion-vue";

const el = useMotion({ preset: "fade-up", once: true });
</script>

<template>
  <div :ref="el">Hello</div>
</template>
```

### Config

| Field      | Type      | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `preset`   | `string`  | —       | Animation preset name (required) |
| `delay`    | `number`  | `0`     | Delay in ms                      |
| `duration` | `number`  | `600`   | Duration in ms                   |
| `once`     | `boolean` | `false` | Animate only once                |

## Requirements

- Vue ≥ 3
- viewmotion ≥ 0.1.0

## License

MIT
