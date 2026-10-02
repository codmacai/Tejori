"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import comboImg from "@/public/images/hero-combo.jpg";
import hairImg from "@/public/images/concern-growth.jpg";
import duoImg from "@/public/images/duo-packshot.jpg";
import { IconArrow } from "./Icons";

type Slide = {
  eyebrow: string;
  title: string[];
  cta: { label: string; href: string };
  tone: "light" | "dark";
  bg: string;
  image: StaticImageData;
  alt: string;
  /** cover = full-bleed photo, stage = product floating on a colour field */
  layout: "cover" | "stage";
  focus?: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Neelayamari hair care",
    title: ["Rooted in", "nature."],
    cta: { label: "Shop the combo", href: "#combo" },
    tone: "light",
    bg: "#f3f1ea",
    image: comboImg,
    alt: "Tejori Neelayamari shampoo and hair oil in soft morning light",
    layout: "cover",
    focus: "70% 60%",
  },
  {
    eyebrow: "Neelayamari Hair Oil",
    title: ["Every strand,", "nourished."],
    cta: { label: "Shop hair oil", href: "#neelayamari-hair-oil" },
    tone: "dark",
    bg: "#14100d",
    image: hairImg,
    alt: "Close-up of healthy hair roots",
    layout: "cover",
    focus: "50% 50%",
  },
  {
    eyebrow: "For all hair types",
    title: ["Pure. Simple.", "Effective."],
    cta: { label: "Shop bestsellers", href: "#shop" },
    tone: "light",
    bg: "#dce0c5",
    image: duoImg,
    alt: "Tejori Neelayamari hair oil and anti-dandruff shampoo",
    layout: "stage",
  },
];

const DURATION = 7000;

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  // Let the transparent header match the slide underneath it
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("hero-tone", { detail: slides[i].tone }));
  }, [i]);

  const s = slides[i];
  const light = s.tone === "dark"; // light text on dark slides

  return (
    <section
      id="top"
      className="film-grain relative h-[100svh] min-h-[620px] overflow-hidden transition-colors duration-1000"
      style={{ background: s.bg }}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((sl, n) => {
        const active = n === i;
        return (
          <div
            key={sl.eyebrow}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${active ? "opacity-100" : "opacity-0"}`}
            style={{ background: sl.bg }}
            aria-hidden={!active}
          >
            {sl.layout === "cover" ? (
              <div
                className={`absolute overflow-hidden ${
                  sl.tone === "light" ? "inset-x-0 top-0 h-[64%] md:inset-y-0 md:left-[26%] md:h-full" : "inset-0"
                }`}
              >
              <Image
                src={sl.image}
                alt={sl.alt}
                fill
                priority={n === 0}
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: sl.focus,
                  animation: active ? `pushin ${DURATION + 1600}ms linear both` : undefined,
                }}
              />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-start justify-center pt-[15svh] md:items-center md:justify-end md:pr-[9%] md:pt-0">
                <div
                  className="relative aspect-[482/345] w-[92vw] max-w-[640px] md:w-[46vw]"
                  style={{ animation: active ? `pushin ${DURATION + 1600}ms linear both` : undefined }}
                >
                  <Image src={sl.image} alt={sl.alt} fill sizes="(min-width: 768px) 44vw, 86vw" className="object-contain" />
                </div>
              </div>
            )}

            {/* legibility scrims */}
            {sl.tone === "dark" ? (
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,.15)_40%,rgba(0,0,0,.6)_100%)]" />
            ) : sl.layout === "cover" ? (
              <div
                className="absolute inset-0"
                style={{ ["--bg" as string]: sl.bg }}
              >
                <div className="absolute inset-x-0 top-[38%] h-[26%] bg-[linear-gradient(0deg,var(--bg)_0%,transparent_100%)] md:hidden" />
                <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_22%,transparent_46%),linear-gradient(0deg,var(--bg)_0%,transparent_22%)] md:block" />
              </div>
            ) : null}
          </div>
        );
      })}

      {/* copy */}
      <div className={`relative z-10 flex h-full flex-col justify-end ${light ? "text-white" : "text-ink"}`}>
        <div className="container-x pb-28 md:pb-[14vh]">
          <div key={i} className="max-w-[900px]">
            <p className="eyebrow overflow-hidden">
              <span className="block animate-[rise_1s_var(--ease-out-expo)_.2s_both]">{s.eyebrow}</span>
            </p>
            <h1 className="mt-5 text-[3.2rem] font-light leading-[0.98] tracking-[-0.045em] sm:text-[4.5rem] md:mt-7 md:text-[6.2rem] lg:text-[7.2rem]">
              {s.title.map((t, k) => (
                <span key={t} className="block overflow-hidden pb-[0.06em]">
                  <span
                    className="block animate-[rise_1.3s_var(--ease-out-expo)_both]"
                    style={{ animationDelay: `${350 + k * 120}ms` }}
                  >
                    {t}
                  </span>
                </span>
              ))}
            </h1>
            <div className="mt-8 animate-[fadeUp_1s_var(--ease-out-expo)_.8s_both] md:mt-12">
              <a
                href={s.cta.href}
                className={`group inline-flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.22em]`}
              >
                <span className={`grid h-14 w-14 place-items-center rounded-full border transition-all duration-500 group-hover:scale-110 ${
                  light ? "border-white/50 group-hover:border-white group-hover:bg-white group-hover:text-ink" : "border-ink/30 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                }`}>
                  <IconArrow className="h-5 w-5" />
                </span>
                <span className="relative">
                  {s.cta.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${light ? "bg-white" : "bg-ink"}`} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* bottom rail */}
        <div className={`absolute inset-x-0 bottom-0 ${light ? "text-white" : "text-ink"}`}>
          <div className="container-x flex items-end justify-between pb-8">
            <div className="hidden items-center gap-3 md:flex">
              <span className={`relative h-12 w-px overflow-hidden ${light ? "bg-white/25" : "bg-ink/20"}`}>
                <span className={`absolute inset-0 animate-[scrollcue_2.4s_ease-in-out_infinite] ${light ? "bg-white" : "bg-ink"}`} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] opacity-70">Scroll</span>
            </div>

            <div className="flex w-full items-center justify-between gap-6 md:w-auto md:justify-end">
              <div className="flex items-center gap-2">
                {slides.map((_, n) => (
                  <button
                    key={n}
                    onClick={() => go(n)}
                    aria-label={`Go to slide ${n + 1}`}
                    className="group flex items-center gap-2 py-3"
                  >
                    <span className={`text-[12px] font-medium tabular-nums tracking-[0.1em] transition-opacity ${n === i ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                      0{n + 1}
                    </span>
                    <span className={`relative h-px overflow-hidden transition-all duration-700 ${n === i ? "w-16 md:w-24" : "w-6"} ${light ? "bg-white/30" : "bg-ink/20"}`}>
                      {n === i && (
                        <span
                          key={`${i}-${paused}`}
                          className={`absolute inset-0 origin-left ${light ? "bg-white" : "bg-ink"}`}
                          style={{ animation: paused ? "none" : `progress ${DURATION}ms linear both`, transform: paused ? "scaleX(1)" : undefined }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    onClick={() => go(i + d)}
                    aria-label={d < 0 ? "Previous slide" : "Next slide"}
                    className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 ${
                      light ? "border-white/40 hover:bg-white hover:text-ink" : "border-ink/25 hover:bg-ink hover:text-white"
                    }`}
                  >
                    <IconArrow className={`h-4 w-4 ${d < 0 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
