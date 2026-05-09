# viewmotion-svelte

Svelte adapter for [viewmotion](https://github.com/Elia97/viewmotion) — a minimal reveal animation system for landing pages.

## Install

```bash
npm install viewmotion viewmotion-svelte
```

## Setup

Import the stylesheet once at your app entry point:

```ts
import "viewmotion/styles.css";
```

## Usage

```svelte
<script>
  import { motion } from "viewmotion-svelte";
</script>

<div use:motion={{ preset: 'fade-up', delay: 100, once: true }}>
  Hello
</div>
```

### `use:motion` action

| Field      | Type      | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `preset`   | `string`  | —       | Animation preset name (required) |
| `delay`    | `number`  | `0`     | Delay in ms                      |
| `duration` | `number`  | `600`   | Duration in ms                   |
| `once`     | `boolean` | `false` | Animate only once                |

The action supports reactive updates — changing the config object re-applies the animation.

## Requirements

- Svelte ≥ 4
- viewmotion ≥ 0.1.0

## License

MIT
