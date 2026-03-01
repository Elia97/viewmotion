import { useMotion } from "viewmotion-react";

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
] as const;

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

function PresetCard({
  preset,
  label,
  desc,
}: {
  preset: string;
  label: string;
  desc: string;
}) {
  const ref = useMotion<HTMLDivElement>({ preset });
  return (
    <div ref={ref} className="card">
      <div className="card-number" style={{ fontSize: "1.1rem" }}>
        {label}
      </div>
      <p>{desc}</p>
    </div>
  );
}

function StaggerCard({
  n,
  title,
  desc,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useMotion<HTMLDivElement>({ preset: "fade-up", delay });
  return (
    <div ref={ref} className="card">
      <div className="card-number">{n}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function App() {
  const badgeRef = useMotion<HTMLDivElement>({
    preset: "fade-up",
    duration: 700,
  });
  const titleRef = useMotion<HTMLHeadingElement>({
    preset: "fade-up",
    delay: 100,
    duration: 700,
  });
  const descRef = useMotion<HTMLParagraphElement>({
    preset: "fade-up",
    delay: 200,
    duration: 700,
  });
  const hintRef = useMotion<HTMLParagraphElement>({
    preset: "fade",
    delay: 350,
    duration: 800,
  });

  const whatH2 = useMotion<HTMLHeadingElement>({
    preset: "slide-left",
    duration: 600,
  });
  const whatP = useMotion<HTMLParagraphElement>({
    preset: "fade-up",
    delay: 100,
  });
  const feat1 = useMotion<HTMLDivElement>({
    preset: "slide-left",
    delay: 0,
    duration: 500,
  });
  const feat2 = useMotion<HTMLDivElement>({
    preset: "slide-left",
    delay: 80,
    duration: 500,
  });
  const feat3 = useMotion<HTMLDivElement>({
    preset: "slide-left",
    delay: 160,
    duration: 500,
  });

  const apiH2 = useMotion<HTMLHeadingElement>({
    preset: "fade-up",
    duration: 600,
  });
  const apiP = useMotion<HTMLParagraphElement>({
    preset: "fade-up",
    delay: 100,
  });
  const apiCode = useMotion<HTMLDivElement>({
    preset: "scale-in",
    delay: 150,
    duration: 600,
  });

  const presetsH2 = useMotion<HTMLHeadingElement>({
    preset: "fade-up",
    duration: 600,
  });
  const presetsP = useMotion<HTMLParagraphElement>({
    preset: "fade-up",
    delay: 80,
  });

  const staggerH2 = useMotion<HTMLHeadingElement>({
    preset: "fade-up",
    duration: 600,
  });
  const staggerP = useMotion<HTMLParagraphElement>({
    preset: "fade-up",
    delay: 80,
  });

  const ctaRef = useMotion<HTMLDivElement>({
    preset: "scale-in",
    duration: 700,
  });

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div ref={badgeRef}>
          <span className="badge">viewmotion — React</span>
        </div>
        <h1 ref={titleRef}>
          Minimal motion
          <br />
          for the modern web.
        </h1>
        <p ref={descRef}>
          React playground powered by <code>useMotion</code> hook, CSS
          animations, and zero runtime dependencies.
        </p>
        <p ref={hintRef}>Scroll down to see animations trigger ↓</p>
      </div>

      <hr className="divider" />

      {/* SECTION 1 */}
      <section>
        <h2 ref={whatH2}>What it does</h2>
        <p ref={whatP}>
          viewmotion observes elements entering the viewport and applies a CSS
          class that triggers a smooth animation. No scroll events. No polling.
          One observer.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <div ref={feat1} className="feature-item">
            <div className="feature-icon">✦</div>
            <div>
              <strong>IntersectionObserver</strong>
              <p>Single global observer for all animated elements.</p>
            </div>
          </div>
          <div ref={feat2} className="feature-item">
            <div className="feature-icon">⚡</div>
            <div>
              <strong>Zero dependencies</strong>
              <p>No GSAP. No scroll libraries. Just the platform.</p>
            </div>
          </div>
          <div ref={feat3} className="feature-item">
            <div className="feature-icon">♿</div>
            <div>
              <strong>Accessible</strong>
              <p>
                Respects <code>prefers-reduced-motion</code> out of the box.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* SECTION 2 — API */}
      <section>
        <h2 ref={apiH2}>React Hook API</h2>
        <p ref={apiP}>
          Use <code>useMotion()</code> to get a ref, then attach it to any
          element.
        </p>
        <div
          ref={apiCode}
          style={{
            marginTop: "2rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "1.5rem",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            lineHeight: 2,
          }}
        >
          <div>
            <span style={{ color: "#6366f1" }}>const</span> ref ={" "}
            <span style={{ color: "#6366f1" }}>useMotion</span>
            {"({ preset: 'fade-up' })"}
          </div>
          <div>
            {"<div "}ref={"{ref}"}
            {">Hello</div>"}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* SECTION 3 — Presets */}
      <section>
        <h2 ref={presetsH2}>All presets</h2>
        <p ref={presetsP}>
          Scroll through to see each animation. Every box uses a different
          preset.
        </p>
        <div className="card-grid" style={{ marginTop: "2rem" }}>
          {presets.map((p) => (
            <PresetCard
              key={p.preset}
              preset={p.preset}
              label={p.label}
              desc={p.desc}
            />
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* SECTION 4 — Stagger */}
      <section>
        <h2 ref={staggerH2}>Stagger grid</h2>
        <p ref={staggerP}>
          Each card uses an incremental delay via <code>useMotion</code>.
        </p>
        <div className="card-grid" style={{ marginTop: "2rem" }}>
          {staggerCards.map((c, i) => (
            <StaggerCard
              key={c.n}
              n={c.n}
              title={c.title}
              desc={c.desc}
              delay={100 + i * 80}
            />
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section>
        <div ref={ctaRef} className="cta-box">
          <h2>Ready to ship?</h2>
          <p style={{ margin: "0 auto", textAlign: "center" }}>
            Drop <code>useMotion()</code> into your project and start animating.
          </p>
          <a href="#" className="btn">
            Get started
          </a>
        </div>
      </section>
    </>
  );
}
