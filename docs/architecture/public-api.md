# viewmotion — Public API Contract

> Reference document for the public contract of the package.
> Updated: 2026-03-01

---

## What does the package promise?

`viewmotion` is a minimal reveal-animation system for landing pages, framework-agnostic and SSR-safe. It animates elements as they enter the viewport using CSS `@keyframes` and `IntersectionObserver`, with zero required runtime dependencies.

---

## Exported APIs (stable)

### Entry point: `viewmotion`

| Export             | Type     | Description                                            |
| ------------------ | -------- | ------------------------------------------------------ |
| `initMotion()`     | function | Initialises the system: observer + optional scroll     |
| `registerPreset()` | function | Registers a custom preset with CSS injection           |
| `motion()`         | function | Helper to create `data-motion` from a `MotionConfig`   |
| `stagger()`        | function | Helper to create `data-stagger` from a `StaggerConfig` |

### Entry point: `viewmotion/adapter`

| Export      | Type     | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| `observe()` | function | Low-level API for framework adapters (React, Vue, Svelte) |

### Entry point: `viewmotion/styles.css`

CSS with built-in keyframes, reveal rules and base Lenis styles.

---

## Public Types

| Type            | Description                                 |
| --------------- | ------------------------------------------- |
| `MotionOptions` | Options for `initMotion()` and `observe()`  |
| `MotionConfig`  | Configuration for a single animated element |
| `MotionPreset`  | Preset definition (`{ keyframes: string }`) |
| `MotionCleanup` | Cleanup handle from `initMotion()`          |
| `ScrollOptions` | Lenis options passed to `initMotion()`      |
| `StaggerConfig` | Stagger configuration (`{ delay?, step? }`) |

---

## Expected Runtime Behaviour

### `initMotion(options?)`

1. **SSR-safe**: no-op if `window` does not exist
2. Initialises Lenis smooth scroll (unless `smoothScroll: false`)
3. Collects all `[data-motion]` and `[data-stagger]` from the DOM
4. Normalises JSON `data-motion` → individual attributes
5. Respects `prefers-reduced-motion`: immediate reveal, 0ms
6. Above-fold elements: revealed after `window.load`
7. Below-fold elements: observed with `IntersectionObserver`
8. Returns `{ scroll, destroy() }`

### `observe(el, config, options?)`

1. **SSR-safe**: no-op if `window` does not exist
2. Writes config as `data-*` attributes
3. Respects `prefers-reduced-motion`
4. Uses a shared observer for efficiency
5. Prevents double-observe (React StrictMode safe)
6. Returns a cleanup function

### `motion(config)` / `stagger(config)`

- Pure functions, no side effects
- Return `Record<string, string>` for attribute spreading

### `registerPreset(name, preset)`

- Adds to the PRESETS registry
- Injects a `<style>` into the DOM (idempotent)
- SSR-safe: skips injection if `document` does not exist

---

## Side Effects

| Module       | Side Effect                         | Note                                |
| ------------ | ----------------------------------- | ----------------------------------- |
| `scroll.ts`  | `requestAnimationFrame`             | Only if `smoothScroll !== false`    |
| `presets.ts` | Mutable `PRESETS` map               | Global state, intentional by design |
| `adapter.ts` | `observed` WeakSet, `observers` Map | Shared module state                 |
| `styles.css` | Global styles                       | Explicit import required            |

---

## What is Internal (not stable)

| Module             | Function                 | Reason                      |
| ------------------ | ------------------------ | --------------------------- |
| `runtime/observer` | `createObserver()`       | Implementation detail       |
| `runtime/registry` | `normalizeElement()`     | Internal parser             |
| `runtime/registry` | `collectElements()`      | Internal DOM collector      |
| `runtime/registry` | `prepareElement()`       | Internal DOM manipulation   |
| `runtime/registry` | `revealElement()`        | Internal DOM manipulation   |
| `runtime/registry` | `resetElement()`         | Internal DOM manipulation   |
| `runtime/registry` | `revealAllImmediately()` | prefers-reduced-motion case |
| `runtime/scroll`   | `initScroll()`           | Internal Lenis wrapper      |

---

## Initialisation Modes

### Static (HTML / Astro)

```ts
import "viewmotion/styles.css";
import { initMotion } from "viewmotion";

const { destroy } = await initMotion();
```

### Framework Adapter (React / Vue / Svelte)

```ts
import "viewmotion/styles.css";
import { observe } from "viewmotion/adapter";

// Or via the wrapper packages:
// viewmotion-react  → useMotion()
// viewmotion-vue    → useMotion() / vMotion directive
// viewmotion-svelte → motion action
```

---

## Design Principles

1. **Zero required runtime deps** — Lenis is optional (`peerDependencies`)
2. **CSS-first** — Animations are CSS `@keyframes`, JS only handles timing
3. **SSR-safe** — Every function accessing the DOM has a `typeof window` guard
4. **Framework-agnostic** — The core does not import React/Vue/Svelte
5. **Progressive enhancement** — Without JS, elements remain visible (no FOUC if CSS is loaded)
