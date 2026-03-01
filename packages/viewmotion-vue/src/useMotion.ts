import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { observe } from "viewmotion/adapter";
import type { MotionConfig, MotionOptions } from "viewmotion/adapter";

/**
 * Vue composable for viewmotion reveal animations.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMotion } from "viewmotion-vue"
 *
 * const el = useMotion({ preset: "fade-up", once: true })
 * </script>
 *
 * <template>
 *   <div :ref="el">Hello</div>
 * </template>
 * ```
 */
export function useMotion(
  config: MotionConfig,
  options?: MotionOptions,
): Ref<HTMLElement | null> {
  const elRef = ref<HTMLElement | null>(null);
  let cleanup: (() => void) | null = null;

  onMounted(() => {
    if (!elRef.value) return;
    cleanup = observe(elRef.value, config, options);
  });

  onUnmounted(() => {
    cleanup?.();
    cleanup = null;
  });

  return elRef;
}
