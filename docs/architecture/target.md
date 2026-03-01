# viewmotion — Target Architecture

> Logical schema after refactoring

---

## Directory Structure

```
src/
├── index.ts                  # Entry point — public API re-exports only
├── adapter.ts                # Adapter entry point — observe()
├── styles.css                # CSS keyframes + reveal rules (unchanged)
│
├── types/
│   ├── public.ts             # Exported types (MotionConfig, MotionOptions, etc.)
│   └── internal.ts           # Internal types (NormalizedMotionConfig, etc.)
│
├── core/
│   ├── parser.ts             # Parsing data-motion JSON → MotionConfig
│   ├── normalizer.ts         # MotionConfig → NormalizedMotionConfig (defaults)
│   ├── validator.ts          # Config validation (guards)
│   ├── registry.ts           # Preset registry (PRESETS map + registerPreset)
│   ├── collector.ts          # DOM collection ([data-motion], [data-stagger])
│   └── engine.ts             # AnimationEngine interface + CSSAnimationEngine
│
├── runtime/
│   ├── init.ts               # initMotion() — main orchestrator
│   ├── observer.ts           # IntersectionObserver factory
│   ├── scroll.ts             # Lenis smooth scroll init (unchanged)
│   └── lifecycle.ts          # prepareElement, revealElement, resetElement
│
├── logger/
│   ├── index.ts              # Logger facade
│   └── levels.ts             # Log levels enum
│
└── utils/
    └── guards.ts             # isSSR, isReducedMotion, etc.
```

## Principles

1. **Pure core** — `core/` does not import `window`, `document`, or frameworks
2. **Transformative pipeline**: Input → Parse → Normalize → Validate → Engine
3. **Abstract engine** — `AnimationEngine` interface, CSS implementation
4. **Isolated runtime** — client-side only, with explicit SSR guards
5. **Controlled logger** — no scattered `console.log` calls
6. **Separated types** — public vs internal, `readonly` where possible

## Data Flow

```
HTML attrs (data-motion JSON)
      ↓
  parser.ts — parseMotionAttribute()
      ↓
  normalizer.ts — normalizeConfig()
      ↓
  validator.ts — validateConfig()
      ↓
  engine.ts — CSSAnimationEngine.prepare() / .reveal() / .reset()
      ↓
  observer.ts — IntersectionObserver triggers reveal/reset
```
