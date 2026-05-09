import H1 from "./H1.astro";
import H2 from "./H2.astro";
import H3 from "./H3.astro";
import P from "./P.astro";
import Blockquote from "./Blockquote.astro";
import Tbody from "./Tbody.astro";
import Tr from "./Tr.astro";
import Ul from "./Ul.astro";
import Li from "./Li.astro";
import Pre from "./Pre.astro";

/**
 * MDX component overrides for all docs pages.
 *
 * Standard markdown elements are replaced with Astro components that
 * apply viewmotion scroll animations via server-rendered data attributes
 * — no runtime DOM manipulation needed.
 *
 * Usage in every MDX file:
 *   export { components } from "@/components/docs/index.ts";
 *
 * To change an animation, edit the corresponding component in this folder.
 * `pre` / code blocks are handled in DocsLayout.astro (Shiki raw HTML bypasses MDX component overrides).
 */
export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  blockquote: Blockquote,
  tbody: Tbody,
  tr: Tr,
  ul: Ul,
  li: Li,
  pre: Pre,
};
