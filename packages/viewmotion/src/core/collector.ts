/**
 * Collector — gathers animated elements from the DOM.
 *
 * Responsible only for DOM querying and stagger expansion.
 * Delegates parsing to core/parser.
 */

import { parseMotionAttribute, parseStaggerAttribute } from "./parser.js";

/**
 * Collects all animated elements from the document.
 *
 * - Normalises JSON data-motion values (rewrites to preset name + data-* attrs)
 * - Expands stagger containers: collects their direct children instead,
 *   assigning auto-computed delay offsets
 *
 * Returns the flat list of elements to animate.
 */
export function collectElements(): HTMLElement[] {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-motion], [data-stagger]"),
  );

  const result: HTMLElement[] = [];

  for (const el of nodes) {
    if (el.dataset["stagger"] !== undefined) {
      expandStaggerContainer(el, result);
    } else {
      // Skip direct children of a stagger container — already collected above
      if (isStaggerChild(el)) continue;
      normalizeAndCollect(el, result);
    }
  }

  return result;
}

/**
 * Expand a stagger container: collect its direct children with computed delays.
 */
function expandStaggerContainer(
  container: HTMLElement,
  result: HTMLElement[],
): void {
  const raw = container.dataset["stagger"] ?? "";
  const { delay: baseDelay, step } = parseStaggerAttribute(raw);

  const children = Array.from(container.children) as HTMLElement[];
  children.forEach((child, index) => {
    child.dataset["delay"] = String(baseDelay + index * step);
    result.push(child);
  });
}

/**
 * Parse, normalize, and collect a standalone [data-motion] element.
 */
function normalizeAndCollect(el: HTMLElement, result: HTMLElement[]): void {
  const raw = el.dataset["motion"] ?? "";
  const parsed = parseMotionAttribute(raw);

  if (!parsed.ok) return;

  const { config } = parsed;

  // Rewrite data-motion to the plain preset name so CSS selectors match
  el.dataset["motion"] = config.preset;

  // Write individual attributes only if not already set by the author
  if (config.delay !== undefined && !el.dataset["delay"])
    el.dataset["delay"] = String(config.delay);
  if (config.duration !== undefined && !el.dataset["duration"])
    el.dataset["duration"] = String(config.duration);
  if (config.once !== undefined && !el.dataset["once"])
    el.dataset["once"] = String(config.once);

  result.push(el);
}

/**
 * Check if an element is a direct child of a stagger container.
 */
function isStaggerChild(el: HTMLElement): boolean {
  return (
    (el.parentElement as HTMLElement | null)?.dataset["stagger"] !== undefined
  );
}
