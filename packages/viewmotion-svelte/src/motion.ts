import type { Action } from "svelte/action";
import { observe } from "viewmotion/adapter";
import type { MotionConfig } from "viewmotion/adapter";

/**
 * Svelte action for viewmotion reveal animations.
 *
 * @example
 * ```svelte
 * <script>
 *   import { motion } from "viewmotion-svelte"
 * </script>
 *
 * <div use:motion={{ preset: 'fade-up', delay: 100, once: true }}>
 *   Hello
 * </div>
 * ```
 */
export const motion: Action<HTMLElement, MotionConfig> = (el, config) => {
  if (!config) return {};

  let cleanup = observe(el, config);

  return {
    update(newConfig: MotionConfig) {
      cleanup();
      cleanup = observe(el, newConfig);
    },
    destroy() {
      cleanup();
    },
  };
};
