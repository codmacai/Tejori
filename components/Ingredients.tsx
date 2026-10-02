"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Ing = {
  name: string;
  latin: string;
  benefit: string;
  stat: string;
  foundIn: string;
  bg: string;
  fg: string;
  art: React.ReactNode;
};

const Leafy = ({ c }: { c: string }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
    <path d="M60 112 C 60 80, 58 50, 62 10" stroke={c} strokeWidth="1.6" fill="none" />
    {[20, 34, 48, 62, 76].map((y, i) => (
      <g key={y}>
        <path d={`M61 ${y + 12} C 40 ${y + 6}, 30 ${y - 6}, 26 ${y - 14} C 42 ${y - 12}, 56 ${y - 2}, 61 ${y + 12}`} fill={c} opacity={0.85 - i * 0.08} />
        <path d={`M61 ${y + 18} C 82 ${y + 12}, 92 ${y}, 96 ${y - 8} C 80 ${y - 6}, 66 ${y + 4}, 61 ${y + 18}`} fill={c} opacity={0.75 - i * 0.08} />
      </g>
    ))}
  </svg>
);

const Berries = ({ c }: { c: string }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
    <path d="M60 14 C 58 30, 44 40, 40 54 M60 14 C 64 32, 78 44, 82 58" stroke={c} strokeWidth="1.6" fill="none" />
    {[
      [40, 70, 20],
      [82, 74, 22],
      [60, 92, 18],
    ].map(([x, y, r], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={r} fill={c} opacity={0.9 - i * 0.12} />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M${x} ${y - r} Q ${x + (k - 1) * r * 0.9} ${y}, ${x} ${y + r}`} stroke="#fff" strokeOpacity=".25" fill="none" />
        ))}
      </g>
    ))}
  </svg>
);

const Sprig = ({ c }: { c: string }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
    <path d="M30 110 C 50 80, 70 50, 96 12" stroke={c} strokeWidth="1.6" fill="none" />
    {Array.from({ length: 11 }).map((_, i) => {
      const t = i / 10;
      const x = 30 + t * 66;
      const y = 110 - t * 98;
      return (
        <g key={i}>
          <ellipse cx={x - 9} cy={y - 2} rx="10" ry="2.6" transform={`rotate(-30 ${x - 9} ${y - 2})`} fill={c} />
          <ellipse cx={x + 6} cy={y + 6} rx="10" ry="2.6" transform={`rotate(-70 ${x + 6} ${y + 6})`} fill={c} opacity=".8" />
        </g>
      );
    })}
  </svg>
);

const Flower = ({ c }: { c: string }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
    {Array.from({ length: 5 }).map((_, i) => (
      <path
        key={i}
        d="M60 60 C 40 40, 44 12, 60 8 C 76 12, 80 40, 60 60"
        fill={c}
        opacity={0.9 - i * 0.06}
        transform={`rotate(${i * 72} 60 60)`}
      />
    ))}
    <circle cx="60" cy="60" r="7" fill="#fff" opacity=".5" />
    <path d="M60 60 L 92 30" stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" />
    <circle cx="93" cy="29" r="3" fill="#fff" opacity=".7" />
  </svg>
);

const Grains = ({ c }: { c: string }) => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
    {Array.from({ length: 14 }).map((_, i) => {
      const x = 22 + ((i * 37) % 78);
      const y = 20 + ((i * 53) % 82);
      return (
        <ellipse key={i} cx={x} cy={y} rx="11" ry="4.6" transform={`rotate(${(i * 47) % 180} ${x} ${y})`} fill={c} opacity={0.55 + ((i * 13) % 40) / 100} />
      );
    })}
  </svg>
);

const ingredients: Ing[] = [
  {
    name: "Bhringraj",
    latin: "Eclipta alba",
    benefit: "Known in Ayurveda as the “king of hair”. Supports the anagen growth phase and helps reduce shedding at the root.",
    stat: "−74% hair fall",
    foundIn: "Root Revival Serum",
    bg: "#b9c6b4",
    fg: "#2e4345",
    art: <Leafy c="#2e4345" />,
  },
  {
    name: "Amla",
    latin: "Phyllanthus emblica",
    benefit: "Vitamin-C rich Indian gooseberry that protects strands from oxidative stress and restores natural lustre.",
    stat: "20× vitamin C of orange",
    foundIn: "Bond Wash",
    bg: "#d6dcae",
    fg: "#4a5530",
    art: <Berries c="#5d6b3a" />,
  },
  {
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    benefit: "Boosts scalp microcirculation for a fuller-looking crown — the cult ingredient, cold-pressed and stabilised.",
    stat: "+38% density",
    foundIn: "Scalp Elixir",
    bg: "#2e4345",
    fg: "#f6f2eb",
    art: <Sprig c="#b9c6b4" />,
  },
  {
    name: "Hibiscus",
    latin: "Hibiscus rosa-sinensis",
    benefit: "Natural mucilage coats the cuticle to tame frizz and deliver slip without a single silicone.",
    stat: "96% less frizz",
    foundIn: "Silk Seal Conditioner",
    bg: "#ecd3c7",
    fg: "#7a3f2a",
    art: <Flower c="#b9583e" />,
  },
  {
    name: "Rice protein",
    latin: "Oryza sativa",
    benefit: "Hydrolysed proteins small enough to fill gaps in damaged fibres, rebuilding strength from within.",
    stat: "3.1× stronger",
    foundIn: "Bond Wash",
    bg: "#f3e6c8",
    fg: "#6b5122",
    art: <Grains c="#c49a72" />,
  },
];

export function Ingredients() {
  const [active, setActive] = useState(0);

  return (
    <section id="ingredients" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Reveal>
            <p className="eyebrow text-copper">Inside the vault</p>
            <h2 className="display mt-4 text-[2.7rem] text-ink-deep md:text-[4rem]">
              Ancient botanicals.
              <br />
              <span className="serif-accent text-[1.08em] text-ink">Modern proof.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-md text-ink-deep/65 md:justify-self-end">
            We source each botanical at its peak, extract it at clinically
            effective concentrations, and pair it with a proven active. No
            fillers, no fragrance overload — just what works.
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-3 lg:h-[520px] lg:flex-row">
          {ingredients.map((ing, i) => {
            const on = i === active;
            return (
              <button
                key={ing.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`grain relative overflow-hidden rounded-[28px] text-left transition-[flex-grow,height] duration-700 ease-[var(--ease-out-expo)] ${
                  on ? "h-[420px] lg:h-auto lg:flex-[3.2]" : "h-24 lg:h-auto lg:flex-[1]"
                }`}
                style={{ background: ing.bg, color: ing.fg }}
              >
                <span className="absolute left-6 top-6 serif-accent text-2xl opacity-60">0{i + 1}</span>

                {/* collapsed label */}
                <span
                  className={`display absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap text-2xl transition-opacity duration-500 lg:left-1/2 lg:-translate-x-1/2 lg:-rotate-90 lg:text-3xl ${
                    on ? "opacity-0" : "opacity-100"
                  }`}>
                  {ing.name}
                </span>

                {/* expanded content */}
                <span
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-700 ease-[var(--ease-out-expo)] md:p-8 ${
                    on ? "opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <span className="absolute right-4 top-4 h-44 w-44 md:right-8 md:top-8 md:h-60 md:w-60">{ing.art}</span>
                  <span className="relative block max-w-md">
                    <span className="inline-block rounded-full bg-white/25 px-3 py-1 text-[12px] font-semibold backdrop-blur">
                      {ing.stat}
                    </span>
                    <span className="display mt-4 block text-4xl md:text-5xl">{ing.name}</span>
                    <span className="serif-accent block text-xl opacity-70">{ing.latin}</span>
                    <span className="mt-4 block text-[15px] leading-relaxed opacity-80">{ing.benefit}</span>
                    <span className="mt-5 block text-[13px] font-semibold">
                      Found in → <span className="underline underline-offset-4">{ing.foundIn}</span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
