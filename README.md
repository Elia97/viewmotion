# viewmotion

Minimal reveal animation system for landing pages.

`viewmotion` uses a single `IntersectionObserver` and CSS `@keyframes` to animate elements as they enter the viewport. It is framework-agnostic, SSR-safe, and has zero runtime dependencies. Smooth scroll is available via an optional [Lenis](https://github.com/darkroomengineering/lenis) peer dependency.

This is **not** a scroll-driven animation engine. It solves one problem well: revealing elements on scroll with performant, composable CSS animations.

---

## Packages

| Package                                           | Description                                                 | Version |
| ------------------------------------------------- | ----------------------------------------------------------- | ------- |
| [viewmotion](./packages/viewmotion)               | Core library — framework-agnostic                           | `0.1.0` |
| [viewmotion-react](./packages/viewmotion-react)   | React adapter — `useMotion` hook                            | `0.1.0` |
| [viewmotion-vue](./packages/viewmotion-vue)       | Vue adapter — `v-motion` directive + `useMotion` composable | `0.1.0` |
| [viewmotion-svelte](./packages/viewmotion-svelte) | Svelte adapter — `use:motion` action                        | `0.1.0` |

---

## Quick start

```bash
npm install viewmotion
```

```ts
import "viewmotion/styles.css";
import { initMotion } from "viewmotion";

await initMotion();
```

```html
<h1 data-motion='{"preset":"fade-up"}'>Hello world</h1>
```

For framework-specific usage, see the adapter READMEs linked above.

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

## Documentation

Full API documentation is available in the [viewmotion package README](./packages/viewmotion/README.md).

---

## Development

This is a [pnpm workspace](https://pnpm.io/workspaces) monorepo.

```bash
pnpm install
pnpm build
pnpm test
```

### Playgrounds

```bash
pnpm dev:vanilla   # Vanilla HTML
pnpm dev:react     # React
pnpm dev:vue       # Vue
pnpm dev:svelte    # Svelte
pnpm dev:astro     # Astro
```

---

## License

[MIT](./LICENSE)
