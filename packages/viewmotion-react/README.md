# viewmotion-react

React adapter for [viewmotion](https://github.com/Elia97/viewmotion) — a minimal reveal animation system for landing pages.

## Install

```bash
npm install viewmotion viewmotion-react
```

## Setup

Import the stylesheet once at your app entry point:

```ts
import "viewmotion/styles.css";
```

## Usage

```tsx
import { useMotion } from "viewmotion-react";

function Card() {
  const ref = useMotion<HTMLDivElement>({ preset: "fade-up", delay: 100 });
  return <div ref={ref}>Hello</div>;
}
```

### `useMotion(config, options?)`

Returns a `ref` to attach to the element you want to animate. The element is observed on mount and cleaned up on unmount.

| Parameter            | Type      | Description                         |
| -------------------- | --------- | ----------------------------------- |
| `config.preset`      | `string`  | Animation preset name (required)    |
| `config.delay`       | `number`  | Delay in ms (default `0`)           |
| `config.duration`    | `number`  | Duration in ms (default `600`)      |
| `config.once`        | `boolean` | Animate only once (default `false`) |
| `options.rootMargin` | `string`  | IntersectionObserver rootMargin     |
| `options.threshold`  | `number`  | IntersectionObserver threshold      |

## Requirements

- React ≥ 18
- viewmotion ≥ 0.1.0

## License

MIT
