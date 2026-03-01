import type { Directive } from "vue";
import { observe } from "viewmotion/adapter";
import type { MotionConfig } from "viewmotion/adapter";

/**
 * Vue directive for viewmotion reveal animations.
 *
 * @example
 * ```vue
 * <script setup>
 * import { vMotion } from "viewmotion-vue"
 * </script>
 *
 * <template>
 *   <div v-motion="{ preset: 'fade-up', delay: 100, once: true }">Hello</div>
 * </template>
 * ```
 */
export const vMotion: Directive<HTMLElement, MotionConfig> = {
  mounted(el, binding) {
    const cleanup = observe(el, binding.value);
    (el as any).__viewmotion_cleanup = cleanup;
  },
  updated(el, binding) {
    (el as any).__viewmotion_cleanup?.();
    const cleanup = observe(el, binding.value);
    (el as any).__viewmotion_cleanup = cleanup;
  },
  unmounted(el) {
    (el as any).__viewmotion_cleanup?.();
    delete (el as any).__viewmotion_cleanup;
  },
};
