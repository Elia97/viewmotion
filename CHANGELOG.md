# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-01

### Added

- Core library with IntersectionObserver + CSS @keyframes reveal animations.
- 8 built-in presets: fade, fade-up, fade-down, fade-left, fade-right, slide-left, slide-right, scale-in.
- `initMotion()` for static HTML pages.
- `observe()` adapter API for framework integrations.
- `motion()` and `stagger()` helpers for declarative config.
- `registerPreset()` for custom animation presets.
- Optional Lenis smooth scroll integration (peer dependency).
- React adapter (`viewmotion-react`) — `useMotion` hook.
- Vue adapter (`viewmotion-vue`) — `v-motion` directive + `useMotion` composable.
- Svelte adapter (`viewmotion-svelte`) — `use:motion` action.
- SSR-safe: all browser APIs guarded behind `typeof window` checks.
- `prefers-reduced-motion` support.
- Playground apps for vanilla, React, Vue, Svelte, and Astro.
