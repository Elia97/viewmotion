# viewmotion

Minimal reveal animation system for landing pages.

`viewmotion` uses a single `IntersectionObserver` and CSS `@keyframes` to animate elements as they enter the viewport. It is framework-agnostic, SSR-safe, and has zero runtime dependencies. Smooth scroll is available via an optional `lenis` peer dependency.

This is **not** a scroll-driven animation engine. It solves one problem well: revealing elements on scroll with performant, composable CSS animations.

---

## Install

```bash
npm install viewmotion
```

Optional — for smooth scroll:

```bash
npm install lenis
```

---

## Quick start

1. Import the stylesheet (once, at your app entry point):

```ts
import "viewmotion/styles.css";
```

2. Initialise the motion system:

```ts
import { initMotion } from "viewmotion";

const { destroy } = await initMotion();
```

3. Add `data-motion` attributes to your HTML:

```html
<h1 data-motion='{"preset":"fade-up"}'>Hello world</h1>
```

Elements animate in when they enter the viewport.

---

## HTML API

Every animated element uses a `data-motion` attribute with a JSON config:

```html
<div data-motion='{"preset":"fade-up"}'>Fades up</div>
<div data-motion='{"preset":"slide-left","delay":150}'>Slides in from left</div>
<div data-motion='{"preset":"scale-in","duration":800,"once":true}'>
  Scales in once
</div>
```

### Fields

| Field      | Type      | Default | Description                                                 |
| ---------- | --------- | ------- | ----------------------------------------------------------- |
| `preset`   | `string`  | —       | Animation preset name (required)                            |
| `delay`    | `number`  | `0`     | Delay in ms before animation starts                         |
| `duration` | `number`  | `600`   | Animation duration in ms                                    |
| `once`     | `boolean` | `false` | Animate only once; repeats on every scroll entry by default |

### Stagger

Apply `data-stagger` to a container. Direct children animate in sequence:

```html
<ul data-stagger='{"delay":100,"step":60}'>
  <li data-motion='{"preset":"fade-up"}'>Item 1</li>
  <li data-motion='{"preset":"fade-up"}'>Item 2</li>
  <li data-motion='{"preset":"fade-up"}'>Item 3</li>
</ul>
```

| Field   | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `delay` | `number` | `0`     | Base delay before the first child animates |
| `step`  | `number` | `80`    | Extra delay added per child (ms)           |

---

## Built-in presets

| Name          | Effect                     |
| ------------- | -------------------------- |
| `fade`        | Opacity 0 → 1              |
| `fade-up`     | Fade + translate up 24px   |
| `fade-down`   | Fade + translate down 24px |
| `slide-left`  | Translate from left 32px   |
| `slide-right` | Translate from right 32px  |
| `scale-in`    | Fade + scale from 92%      |
| `zoom-out`    | Fade + scale from 108%     |
| `blur-in`     | Fade + blur from 6px       |

---

## API

### `initMotion(options?)`

Initialises the motion system. Call once after the DOM is ready. Returns a `MotionCleanup` handle.

```ts
const { scroll, destroy } = await initMotion({
  rootMargin: "0px 0px -80px 0px", // IntersectionObserver margin
  threshold: 0.15, // IntersectionObserver threshold
  defaultDuration: 700, // default animation duration (ms)
  defaultDelay: 50, // default animation delay (ms)
  smoothScroll: true, // enable Lenis (default: true, requires lenis)
  scroll: {
    // Lenis options
    lerp: 0.08,
    wheelMultiplier: 1,
  },
});

// Cleanup — call in SPA route teardown to avoid memory leaks
destroy();
```

SSR-safe: the function is a no-op when `window` is not defined.

### `motion(config)`

Returns a `data-motion` attribute object for template spreading:

```ts
import { motion } from "viewmotion";

// Astro
<div {...motion({ preset: "fade-up", delay: 100 })}>

// Vue
<div v-bind="motion({ preset: 'fade-up' })">
```

### `stagger(config?)`

Returns a `data-stagger` attribute object:

```ts
import { stagger, motion } from "viewmotion";

<ul {...stagger({ delay: 100, step: 60 })}>
  <li {...motion({ preset: "fade-up" })}>…</li>
</ul>
```

### `registerPreset(name, preset)`

Registers a custom animation preset. Define your `@keyframes` in CSS, then register:

```ts
import { registerPreset } from "viewmotion";

registerPreset("flip", { keyframes: "my-flip" });
// Now: <div data-motion='{"preset":"flip"}'>
```

The corresponding CSS rules (hide + reveal) are injected automatically.

---

## CSS

Import once at your entry point:

```ts
import "viewmotion/styles.css";
```

Or via `<link>`:

```html
<link rel="stylesheet" href="/node_modules/viewmotion/dist/styles.css" />
```

The stylesheet contains all `@keyframes`, the initial hidden state (`[data-motion]:not(.motion-in) { opacity: 0 }`), and reveal rules. If you use Lenis, it also includes the required Lenis base styles.

---

## Reduce motion

`viewmotion` respects `prefers-reduced-motion: reduce`:

- No `IntersectionObserver` is created
- All elements are revealed immediately with `0ms` duration and delay
- No animations are played

This is handled automatically. No opt-in required.

---

## TypeScript

All public types are exported:

```ts
import type {
  MotionOptions,
  MotionConfig,
  MotionCleanup,
  MotionPreset,
  StaggerConfig,
  ScrollOptions,
} from "viewmotion";
```

---

## Limitations

- **CSS animations only** — uses `@keyframes`, not Web Animations API or JS-driven motion
- **Viewport entry only** — animates on scroll into view, not scroll-linked (no parallax, no progress-based effects)
- **No exit animations** — elements reveal on entry; exit is a class removal (instant reset for `once: false`)
- **Single observer** — all elements share one `IntersectionObserver` with the same `rootMargin` / `threshold`
- **No dynamic elements** — `initMotion()` collects elements once at call time; dynamically added elements require re-initialization

---

## Roadmap

- [ ] `destroy()` cleanup for observed elements (remove inline styles + classes)
- [ ] Dynamic element registration (observe new elements without full re-init)
- [ ] Custom easing per-preset
- [ ] Exit animation support
- [ ] Scroll-progress-based animations

The API is not yet stable (`0.x`). Breaking changes may occur before `1.0`.

---

## License

MIT
