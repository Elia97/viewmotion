import Lenis from "lenis"

// Singleton Lenis instance: created once on the first page load and
// kept alive across SPA navigations. Destroying/recreating Lenis on
// every astro:page-load causes the first wheel after navigation to
// jump (state desync between the new instance and the document).
let instance: Lenis | null = null

function ensureInstance(): Lenis {
  if (instance) return instance

  instance = new Lenis({
    lerp: 0.05,
    wheelMultiplier: 1.5,
  })

  const raf = (time: number) => {
    instance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return instance
}

/** Initialise Lenis on first call; refresh it (re-measure DOM) on subsequent calls. */
export function initOrRefreshLenis(): Lenis {
  const lenis = ensureInstance()
  lenis.resize()
  return lenis
}
