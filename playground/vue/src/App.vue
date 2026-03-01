<script setup lang="ts">
import { vMotion } from "viewmotion-vue";

const presets = [
  { preset: "fade", label: "fade", desc: "Pure opacity, no movement." },
  { preset: "fade-up", label: "fade-up", desc: "Opacity + rises 24 px." },
  {
    preset: "fade-down",
    label: "fade-down",
    desc: "Opacity + drops 24 px from top.",
  },
  {
    preset: "slide-left",
    label: "slide-left",
    desc: "Opacity + enters from left 32 px.",
  },
  {
    preset: "slide-right",
    label: "slide-right",
    desc: "Opacity + enters from right 32 px.",
  },
  {
    preset: "scale-in",
    label: "scale-in",
    desc: "Opacity + scales up from 92%.",
  },
  {
    preset: "zoom-out",
    label: "zoom-out",
    desc: "Opacity + shrinks from 108%.",
  },
  { preset: "blur-in", label: "blur-in", desc: "Opacity + blur from 6 px." },
];

const staggerCards = [
  {
    n: "01",
    title: "Observer",
    desc: "One IntersectionObserver for all elements.",
  },
  {
    n: "02",
    title: "Presets",
    desc: "8 built-in presets, extensible with registerPreset().",
  },
  {
    n: "03",
    title: "Reduced motion",
    desc: "Instant reveal for accessibility preferences.",
  },
  {
    n: "04",
    title: "Zero deps",
    desc: "No runtime dependencies. Pure platform APIs.",
  },
  {
    n: "05",
    title: "SSR-ready",
    desc: "Works over static HTML and server-rendered pages.",
  },
  {
    n: "06",
    title: "Extensible",
    desc: "Clean architecture ready for V2 features.",
  },
];
</script>

<template>
  <!-- HERO -->
  <div class="hero">
    <div v-motion="{ preset: 'fade-up', duration: 700 }">
      <span class="badge">viewmotion — Vue</span>
    </div>
    <h1 v-motion="{ preset: 'fade-up', delay: 100, duration: 700 }">
      Minimal motion<br />for the modern web.
    </h1>
    <p v-motion="{ preset: 'fade-up', delay: 200, duration: 700 }">
      Vue playground powered by <code>v-motion</code> directive, CSS animations,
      and zero runtime dependencies.
    </p>
    <p v-motion="{ preset: 'fade', delay: 350, duration: 800 }">
      Scroll down to see animations trigger ↓
    </p>
  </div>

  <hr class="divider" />

  <!-- SECTION 1 -->
  <section>
    <h2 v-motion="{ preset: 'slide-left', duration: 600 }">What it does</h2>
    <p v-motion="{ preset: 'fade-up', delay: 100 }">
      viewmotion observes elements entering the viewport and applies a CSS class
      that triggers a smooth animation. No scroll events. No polling. One
      observer.
    </p>
    <div style="margin-top: 2rem">
      <div
        class="feature-item"
        v-motion="{ preset: 'slide-left', delay: 0, duration: 500 }"
      >
        <div class="feature-icon">✦</div>
        <div>
          <strong>IntersectionObserver</strong>
          <p>Single global observer for all animated elements.</p>
        </div>
      </div>
      <div
        class="feature-item"
        v-motion="{ preset: 'slide-left', delay: 80, duration: 500 }"
      >
        <div class="feature-icon">⚡</div>
        <div>
          <strong>Zero dependencies</strong>
          <p>No GSAP. No scroll libraries. Just the platform.</p>
        </div>
      </div>
      <div
        class="feature-item"
        v-motion="{ preset: 'slide-left', delay: 160, duration: 500 }"
      >
        <div class="feature-icon">♿</div>
        <div>
          <strong>Accessible</strong>
          <p>Respects <code>prefers-reduced-motion</code> out of the box.</p>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- SECTION 2 — API -->
  <section>
    <h2 v-motion="{ preset: 'fade-up', duration: 600 }">Vue Directive API</h2>
    <p v-motion="{ preset: 'fade-up', delay: 100 }">
      Use <code>v-motion</code> directive on any element.
    </p>
    <div
      v-motion="{ preset: 'scale-in', delay: 150, duration: 600 }"
      style="
        margin-top: 2rem;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        font-family: monospace;
        font-size: 0.9rem;
        line-height: 2;
      "
    >
      <div>
        &lt;div <span style="color: #6366f1">v-motion</span>="{ preset:
        'fade-up' }"&gt;
      </div>
      <div>&nbsp;&nbsp;Hello</div>
      <div>&lt;/div&gt;</div>
    </div>
  </section>

  <hr class="divider" />

  <!-- SECTION 3 — Presets -->
  <section>
    <h2 v-motion="{ preset: 'fade-up', duration: 600 }">All presets</h2>
    <p v-motion="{ preset: 'fade-up', delay: 80 }">
      Scroll through to see each animation. Every box uses a different preset.
    </p>
    <div class="card-grid" style="margin-top: 2rem">
      <div
        v-for="p in presets"
        :key="p.preset"
        class="card"
        v-motion="{ preset: p.preset }"
      >
        <div class="card-number" style="font-size: 1.1rem">{{ p.label }}</div>
        <p>{{ p.desc }}</p>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- SECTION 4 — Stagger -->
  <section>
    <h2 v-motion="{ preset: 'fade-up', duration: 600 }">Stagger grid</h2>
    <p v-motion="{ preset: 'fade-up', delay: 80 }">
      Each card uses an incremental delay via <code>v-motion</code>.
    </p>
    <div class="card-grid" style="margin-top: 2rem">
      <div
        v-for="(c, i) in staggerCards"
        :key="c.n"
        class="card"
        v-motion="{ preset: 'fade-up', delay: 100 + i * 80 }"
      >
        <div class="card-number">{{ c.n }}</div>
        <h3>{{ c.title }}</h3>
        <p>{{ c.desc }}</p>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- CTA -->
  <section>
    <div class="cta-box" v-motion="{ preset: 'scale-in', duration: 700 }">
      <h2>Ready to ship?</h2>
      <p style="margin: 0 auto; text-align: center">
        Drop <code>v-motion</code> into your project and start animating.
      </p>
      <a href="#" class="btn">Get started</a>
    </div>
  </section>
</template>
