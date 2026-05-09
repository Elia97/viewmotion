import { useRef, useEffect } from "react";
import { observe } from "viewmotion/adapter";
import type { MotionConfig, MotionOptions } from "viewmotion/adapter";

/**
 * React hook for viewmotion reveal animations.
 *
 * Returns a ref to attach to the element you want to animate.
 * The element is observed on mount and cleaned up on unmount.
 *
 * @example
 * ```tsx
 * import { useMotion } from "viewmotion-react"
 *
 * function Card() {
 *   const ref = useMotion<HTMLDivElement>({ preset: "fade-up", delay: 100 })
 *   return <div ref={ref}>Hello</div>
 * }
 * ```
 */
export function useMotion<T extends HTMLElement = HTMLElement>(
  config: MotionConfig,
  options?: MotionOptions,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, config, options);
  }, [config.preset, config.delay, config.duration, config.once]);

  return ref;
}
