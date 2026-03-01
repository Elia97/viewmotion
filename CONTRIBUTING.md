# viewmotion — Development Guide

## Overview

viewmotion is a pnpm monorepo composed of 4 packages and 5 playgrounds:

```
packages/
  viewmotion/            Core library (IntersectionObserver + CSS @keyframes)
  viewmotion-react/      React adapter — useMotion hook
  viewmotion-vue/        Vue adapter — vMotion directive + useMotion composable
  viewmotion-svelte/     Svelte adapter — use:motion action

playground/
  vanilla/               Plain HTML page              port 3000
  react/                 Vite + React 19              port 3001
  vue/                   Vite + Vue 3                 port 3002
  svelte/                Vite + Svelte 5              port 3003
  astro/                 Astro + MDX                  port 4000
```

## Requirements

- Node.js >= 18
- pnpm >= 9

## Initial setup

```bash
pnpm install
pnpm run build
```

## Main commands

| Command            | Description                                   |
| ------------------ | --------------------------------------------- |
| `pnpm run build`   | Builds all packages in `packages/`            |
| `pnpm run test`    | Runs all tests (vitest)                       |
| `pnpm run clean`   | Removes the `dist/` folders from all packages |
| `pnpm dev:vanilla` | Starts the vanilla playground (:3000)         |
| `pnpm dev:react`   | Starts the React playground (:3001)           |
| `pnpm dev:vue`     | Starts the Vue playground (:3002)             |
| `pnpm dev:svelte`  | Starts the Svelte playground (:3003)          |
| `pnpm dev:astro`   | Starts the Astro playground (:4000)           |

The playgrounds use fixed ports and can all run in parallel.

## Architecture

### Core (`packages/viewmotion`)

Main entry points:

- **`src/index.ts`** — Public API: `initMotion`, `registerPreset`, `motion`, `stagger` + types.
- **`src/adapter.ts`** — Low-level `observe()` API used by framework adapters. Creates an IntersectionObserver for a single element and returns a cleanup function.
- **`src/styles.css`** — CSS animations (`@keyframes`) and reveal rules.

Internal modules (`src/runtime/`):

| File          | Responsibility                                        |
| ------------- | ----------------------------------------------------- |
| `init.ts`     | `initMotion()` — global setup, shared observer, Lenis |
| `observer.ts` | Factory for `IntersectionObserver`                    |
| `registry.ts` | `prepareElement`, `revealElement`, `resetElement`     |
| `presets.ts`  | Built-in preset map + `registerPreset()`              |
| `scroll.ts`   | Dynamic import of Lenis (separate chunk)              |

#### Flow of a reveal animation

1. `prepareElement(el)` sets `opacity: 0` and the CSS custom properties `--motion-duration` / `--motion-delay`.
2. The `IntersectionObserver` detects entry into the viewport.
3. The `.motion-in` class is added, triggering the CSS `animation` via `@keyframes`.
4. If `data-once="true"`, the observer stops observing the element after the reveal.

#### Smooth scroll (Lenis)

Lenis is an **optional** peer dependency. It is dynamically imported in `scroll.ts` and tsup isolates it into a separate chunk thanks to `splitting: true`. If Lenis is not installed, the dynamic import fails silently and `scroll` remains `null`.

### Framework adapters

All three adapter packages depend on `viewmotion/adapter` and follow the same pattern:

1. They receive a `MotionConfig` (`{ preset, delay?, duration?, once? }`).
2. They call `observe(el, config)` on mount.
3. They call the cleanup function on unmount.

| Package           | Exposed API                                         | Pattern                                      |
| ----------------- | --------------------------------------------------- | -------------------------------------------- |
| viewmotion-react  | `useMotion(config)` → `ref`                         | `useRef` + `useEffect`                       |
| viewmotion-vue    | `vMotion` directive, `useMotion(config)` composable | `mounted/unmounted`, `onMounted/onUnmounted` |
| viewmotion-svelte | `motion` action                                     | `use:motion={config}` with `update/destroy`  |

### Built-in presets

| Name          | CSS Keyframes        |
| ------------- | -------------------- |
| `fade`        | `motion-fade`        |
| `fade-up`     | `motion-fade-up`     |
| `fade-down`   | `motion-fade-down`   |
| `slide-left`  | `motion-slide-left`  |
| `slide-right` | `motion-slide-right` |
| `scale-in`    | `motion-scale-in`    |
| `zoom-out`    | `motion-zoom-out`    |
| `blur-in`     | `motion-blur-in`     |

Custom presets can be registered at runtime with `registerPreset(name, { keyframes })`.

## Build

Each package uses **tsup** with the following shared configuration:

- **Format**: ESM only
- **Target**: ES2020
- **dts**: generates `.d.ts`
- **splitting**: `true` (required to isolate Lenis into a separate chunk)
- **minify**: `true`
- **external**: `lenis` (not bundled)

To build a single package:

```bash
pnpm --filter viewmotion build
pnpm --filter viewmotion-react build
```

## Testing

Tests are located in the core package (`packages/viewmotion/src/*.test.ts`) and use **vitest** with `jsdom` as the environment.

```bash
# All tests
pnpm run test

# Watch mode on a package
pnpm --filter viewmotion exec vitest

# A single file
pnpm --filter viewmotion exec vitest run src/adapter.test.ts
```

## Playgrounds

The playgrounds use **Vite** with aliases that point directly to the TypeScript source files of the packages (not to the `dist/`). This means:

- You don't need to build the packages before starting a playground.
- Changes to the package source code are reflected in real time with HMR.

Alias example in `playground/react/vite.config.ts`:

```ts
resolve: {
  alias: {
    viewmotion: "../../packages/viewmotion/src/index.ts",
    "viewmotion/adapter": "../../packages/viewmotion/src/adapter.ts",
    "viewmotion-react": "../../packages/viewmotion-react/src/index.ts",
  },
}
```

## Adding a new preset

1. Add the `@keyframes` in `packages/viewmotion/src/styles.css`.
2. Register the preset in the `PRESETS` map in `packages/viewmotion/src/runtime/presets.ts`.
3. Update the preset table in this file and in the `README.md`.

## Adding a new framework adapter

1. Create `packages/viewmotion-<framework>/` by copying the structure of an existing adapter.
2. Import `observe` from `viewmotion/adapter`.
3. Implement the idiomatic framework binding (hook, directive, action, etc.).
4. Add `tsup.config.ts` with the same base options.
5. Set `viewmotion` and the framework as `peerDependencies`.
6. Create a playground in `playground/<framework>/` with a dedicated port.
7. Add the `dev:<framework>` script in the root `package.json`.

## Accessibility

viewmotion respects `prefers-reduced-motion: reduce`:

- In `initMotion()`: if active, all elements are revealed immediately without creating the observer.
- In `observe()`: duration and delay are set to `0ms` and the element is revealed immediately.

## SSR safety

All APIs check `typeof window === "undefined"` before accessing the DOM, making them safe for SSR (Astro, Next.js, Nuxt, SvelteKit).

## Publishing

The packages are independent and each has its own `package.json` with an `exports` map, `peerDependencies`, and its own version.

```bash
# Clean build
pnpm run clean && pnpm run build

# Verify tests
pnpm run test

# Publish (from inside each package)
cd packages/viewmotion && pnpm publish --access public
cd packages/viewmotion-react && pnpm publish --access public
cd packages/viewmotion-vue && pnpm publish --access public
cd packages/viewmotion-svelte && pnpm publish --access public
```

## Package structure

```
packages/viewmotion-<name>/
  src/
    index.ts          Public re-exports
    <impl>.ts         Implementation
  dist/               Build output (gitignored)
  package.json
  tsconfig.json
  tsup.config.ts
```
