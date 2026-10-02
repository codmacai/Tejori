"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stats = [
  { to: 74, prefix: "−", suffix: "%", label: "less hair fall", sub: "Root Revival Serum, 8 weeks" },
  { to: 38, prefix: "+", suffix: "%", label: "visible density", sub: "Scalp Elixir, 12 weeks" },
  { to: 96, prefix: "", suffix: "%", label: "saw less frizz", sub: "Silk Seal, after 1 use" },
  { to: 93, prefix: "", suffix: "%", label: "would recommend", sub: "Across 2,400 customers" },
];

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

/** Before / after strand comparison, drawn in SVG so it scales crisply. */
function StrandCompare() {
  const [pos, setPos] = useState(52);

  const frizz = Array.from({ length: 26 }).map((_, i) => {
    const x = 20 + i * 14;
    const j = (n: number) => Math.round(Math.sin(i * 12.9898 + n) * 260) / 10;
    return `M${x} 20 C ${x + j(1)} 120, ${x - j(2)} 200, ${x + j(3)} 300 S ${x - j(4)} 420, ${x + j(5) * 1.6} 490`;
  });
  const sleek = Array.from({ length: 26 }).map((_, i) => {
    const x = 20 + i * 14;
    return `M${x} 20 C ${x + 4} 140, ${x - 4} 300, ${x + 2} 470 Q ${x + 3} 485, ${x + 10} 492`;
  });

  return (
    <div className="grain relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand select-none">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {frizz.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#6b5a49" strokeOpacity={0.55} strokeWidth={1.4} />
        ))}
      </svg>
      <div className="absolute inset-0 bg-ink" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="shine" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f6f2eb" stopOpacity=".35" />
              <stop offset=".45" stopColor="#f6f2eb" stopOpacity=".9" />
              <stop offset="1" stopColor="#f6f2eb" stopOpacity=".3" />
            </linearGradient>
          </defs>
          {sleek.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="url(#shine)" strokeWidth={1.5} />
          ))}
        </svg>
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-cream/80 px-3 py-1 text-[12px] font-semibold text-ink-deep backdrop-blur">Before</span>
      <span className="absolute right-4 top-4 rounded-full bg-clay px-3 py-1 text-[12px] font-semibold text-ink-deep">After 8 weeks</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-bone" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-ink shadow-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function Results() {
  return (
    <section id="results" className="scroll-mt-24 bg-bone py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <StrandCompare />
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow text-copper">Proven, not promised</p>
            <h2 className="display mt-4 text-[2.7rem] text-ink-deep md:text-[4rem]">
              Results you can
              <br />
              <span className="serif-accent text-[1.08em] text-ink">run your fingers through.</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ink-deep/65">
              Every hero formula is tested on real people with real hair
              concerns — across textures from straight to coily — before it
              ever reaches the vault.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-line">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-bone p-5 md:p-7">
                <p className="display text-[2.8rem] text-ink-deep md:text-[3.6rem]">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 font-semibold text-ink-deep">{s.label}</p>
                <p className="mt-1 text-[12.5px] text-ink-deep/55">{s.sub}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-[11.5px] text-ink-deep/45">
            *Results from independent consumer perception studies. Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
