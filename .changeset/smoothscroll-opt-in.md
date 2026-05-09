---
"viewmotion": minor
---

**BREAKING**: `smoothScroll` is now disabled by default. Lenis is opt-in.

Previously `initMotion()` instantiated Lenis automatically; users had to pass `{ smoothScroll: false }` to opt out. The default is inverted: pass `{ smoothScroll: true }` to enable smooth scroll. This avoids the implicit `lenis` peer-dependency cost for projects that only need reveal animations.

Migration:
```ts
// before — Lenis enabled by default
await initMotion()

// after — explicit opt-in
await initMotion({ smoothScroll: true })
```

Also: this is the first release published from the consolidated monorepo (pnpm + Turborepo). No other API changes.
