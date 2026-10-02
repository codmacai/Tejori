"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import comboImg from "@/public/images/hero-combo.jpg";
import duoImg from "@/public/images/duo-packshot.jpg";
import ugcImg from "@/public/images/ugc-1.jpg";
import { IconArrow } from "./Icons";

type Slide = {
  eyebrow: string;
  title: string[];
  copy: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  bg: string;
  image: StaticImageData;
  alt: string;
  /** cover = photo bleeding off the right edge, stage = packshot on colour, portrait = framed photo */
  layout: "cover" | "stage" | "portrait";
};

const slides: Slide[] = [
  {
    eyebrow: "Neelayamari hair care",
    title: ["Rooted in", "nature."],
    copy: "Hair oil and anti-dandruff shampoo made with Neelayamari and coconut — for every hair type.",
    primary: { label: "Shop the combo", href: "#combo" },
    secondary: { label: "Explore products", href: "#shop" },
    bg: "#f3f1ea",
    image: comboImg,
    alt: "Tejori Neelayamari shampoo and hair oil in soft morning light",
    layout: "cover",
  },
  {
    eyebrow: "Neelayamari Hair Oil",
    title: ["Stronger roots,", "naturally."],
    copy: "Nourishes from the root for stronger, shinier hair. 100% natural ingredients.",
    primary: { label: "Shop hair oil", href: "#neelayamari-hair-oil" },
    secondary: { label: "Shop by concern", href: "#concerns" },
    bg: "#dce0c5",
    image: duoImg,
    alt: "Tejori Neelayamari hair oil and anti-dandruff shampoo",
    layout: "stage",
  },
  {
    eyebrow: "Real customers",
    title: ["Loved by", "real people."],
    copy: "See how our community makes Tejori part of their everyday hair ritual.",
    primary: { label: "Read reviews", href: "#reviews" },
    secondary: { label: "Shop bestsellers", href: "#shop" },
    bg: "#dde9e5",
    image: ugcImg,
    alt: "Tejori customer holding the shampoo and hair oil",
    layout: "portrait",
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

  const s = slides[i];
  const zoom = (active: boolean) => (active ? `pushin ${DURATION + 1500}ms linear both` : undefined);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] overflow-hidden transition-colors duration-1000"
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
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${active ? "opacity-100" : "opacity-0"}`}
            style={{ background: sl.bg, ["--bg" as string]: sl.bg }}
            aria-hidden={!active}
          >
            {sl.layout === "cover" && (
              <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden md:inset-y-0 md:left-[34%] md:h-full">
                <Image
                  src={sl.image}
                  alt={sl.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover object-[60%_60%]"
                  style={{ animation: zoom(active) }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--bg)_0%,transparent_40%)] md:bg-[linear-gradient(90deg,var(--bg)_0%,transparent_30%)]" />
              </div>
            )}

            {sl.layout === "stage" && (
              <div className="absolute inset-x-0 top-0 flex h-[60%] items-end justify-center md:inset-y-0 md:left-[42%] md:right-[4%] md:h-full md:items-center">
                <div className="relative aspect-[482/345] w-[90%] max-w-[680px]" style={{ animation: zoom(active) }}>
                  <Image src={sl.image} alt={sl.alt} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-contain" />
                </div>
              </div>
            )}

            {sl.layout === "portrait" && (
              <div className="absolute inset-x-0 top-0 flex h-[58%] items-end justify-center pt-24 md:inset-y-0 md:left-auto md:right-[10%] md:h-full md:items-center md:pt-20">
                <div className="relative aspect-[350/535] h-full overflow-hidden rounded-[24px] md:h-[72%]">
                  <Image src={sl.image} alt={sl.alt} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" style={{ animation: zoom(active) }} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* copy */}
      <div className="relative z-10 flex h-full flex-col justify-end md:justify-center">
        <div className="container-x pb-28 md:pb-0 md:pt-24">
          <div key={i} className="max-w-[640px] text-ink">
            <p className="eyebrow overflow-hidden text-muted">
              <span className="block animate-[rise_1s_var(--ease-out-expo)_.15s_both]">{s.eyebrow}</span>
            </p>
            <h1 className="heading mt-4 !leading-[0.96] text-[3rem] sm:text-[4rem] md:mt-6 md:text-[5rem] lg:text-[6rem]">
              {s.title.map((t, k) => (
                <span key={t} className="block overflow-hidden pb-[0.08em]">
                  <span className="block animate-[rise_1.2s_var(--ease-out-expo)_both]" style={{ animationDelay: `${280 + k * 110}ms` }}>
                    {t}
                  </span>
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-muted animate-[fadeUp_1s_var(--ease-out-expo)_.55s_both] md:mt-6 md:text-[17px]">
              {s.copy}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 animate-[fadeUp_1s_var(--ease-out-expo)_.7s_both] md:mt-9">
              <a href={s.primary.href} className="btn btn-ink">
                {s.primary.label}
              </a>
              <a href={s.secondary.href} className="btn btn-outline hidden sm:inline-flex">
                {s.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 text-ink">
        <div className="container-x flex items-center justify-between pb-7 md:pb-9">
          <div className="flex items-center gap-1">
            {slides.map((sl, n) => (
              <button key={n} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} className="group flex items-center gap-3 py-3 pr-3">
                <span className={`text-[13px] font-medium tabular-nums transition-opacity ${n === i ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                  0{n + 1}
                </span>
                <span className={`relative h-[2px] overflow-hidden rounded-full bg-ink/15 transition-all duration-700 ${n === i ? "w-14 md:w-20" : "w-5"}`}>
                  {n === i && (
                    <span
                      key={`${i}-${paused}`}
                      className="absolute inset-0 origin-left bg-ink"
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
                className="grid h-11 w-11 place-items-center rounded-full bg-white/70 backdrop-blur transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <IconArrow className={`h-4 w-4 ${d < 0 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
