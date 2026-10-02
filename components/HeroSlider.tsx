"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import comboImg from "@/public/images/hero-combo.jpg";
import duoImg from "@/public/images/duo-packshot.jpg";
import ugcImg from "@/public/images/ugc-1.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { IconArrow, IconPlus } from "./Icons";

type Slide = {
  eyebrow: string;
  title: string[];
  copy: string;
  cta: { label: string; href: string };
  bg: string;
  dark?: boolean;
  image: StaticImageData;
  layout: "cover" | "packshot" | "portrait";
};

const slides: Slide[] = [
  {
    eyebrow: "The Neelayamari ritual",
    title: ["Complete Hair", "Care Combo"],
    copy: "Hair oil + anti-dandruff shampoo. Nourish the roots and clear the flakes — together.",
    cta: { label: "Shop the combo", href: "#shop" },
    bg: "#f5f3ed",
    image: comboImg,
    layout: "cover",
  },
  {
    eyebrow: "For all hair types",
    title: ["Stronger roots,", "naturally."],
    copy: "Neelayamari and coconut, the way Kerala has cared for hair for generations.",
    cta: { label: "Shop hair oil", href: "#shop" },
    bg: "#dce0c5",
    image: duoImg,
    layout: "packshot",
  },
  {
    eyebrow: "Real customer results",
    title: ["Real people.", "Real results."],
    copy: "See how our community uses Tejori in their everyday hair ritual.",
    cta: { label: "See results", href: "#results" },
    bg: "#2e4345",
    dark: true,
    image: ugcImg,
    layout: "portrait",
  },
];

const DURATION = 6500;

export function HeroSlider() {
  const { add } = useCart();
  const combo = getProduct("anti-dandruff-combo")!;
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

  return (
    <section id="top" className="container-x pt-4 md:pt-8" aria-roledescription="carousel" aria-label="Featured">
      <div
        className="relative h-[640px] overflow-hidden rounded-[28px] transition-colors duration-700 md:h-[min(78vh,720px)] md:min-h-[560px] md:rounded-[36px]"
        style={{ background: s.bg }}
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
              key={sl.title.join()}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} of ${slides.length}`}
            >
              {/* imagery */}
              {sl.layout === "cover" && (
                <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[66%]">
                  <Image
                    src={sl.image}
                    alt="Tejori Neelayamari anti-dandruff shampoo and hair oil in soft sunlight"
                    fill
                    priority
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className={`object-cover object-[62%_70%] ${active ? "animate-[kenburns_7s_ease-out_both]" : ""}`}
                    placeholder="blur"
                  />
                  <div
                    className="absolute inset-0 hidden md:block"
                    style={{ background: `linear-gradient(90deg, ${sl.bg} 0%, ${sl.bg} 8%, ${sl.bg}b3 20%, transparent 46%)` }}
                  />
                  <div
                    className="absolute inset-0 md:hidden"
                    style={{ background: `linear-gradient(180deg, ${sl.bg} 0%, transparent 35%)` }}
                  />
                </div>
              )}

              {sl.layout === "packshot" && (
                <div className="absolute inset-x-0 bottom-0 flex h-[50%] items-end justify-center md:inset-y-0 md:left-auto md:right-[4%] md:h-full md:w-[56%] md:items-center">
                  <div className={`relative aspect-[482/345] w-[92%] max-w-[640px] ${active ? "animate-[kenburns_7s_ease-out_both]" : ""}`}>
                    <Image
                      src={sl.image}
                      alt="Tejori Neelayamari hair oil and anti-dandruff shampoo"
                      fill
                      sizes="(min-width: 768px) 640px, 92vw"
                      className="object-contain"
                      placeholder="blur"
                    />
                  </div>
                </div>
              )}

              {sl.layout === "portrait" && (
                <div className="absolute inset-x-0 bottom-0 flex h-[50%] items-end justify-center md:inset-y-0 md:left-auto md:right-[8%] md:h-full md:w-auto md:items-center">
                  <div className="relative h-[92%] md:h-[84%]">
                    <div className="relative aspect-[350/535] h-full overflow-hidden rounded-t-[26px] md:rounded-[28px]">
                      <Image
                        src={sl.image}
                        alt="Tejori customer holding the shampoo and hair oil"
                        fill
                        sizes="(min-width: 768px) 30vw, 60vw"
                        className={`object-cover ${active ? "animate-[kenburns_7s_ease-out_both]" : ""}`}
                        placeholder="blur"
                      />
                    </div>
                    {/* shoppable chip */}
                    <div className="absolute -left-14 bottom-8 hidden w-[330px] items-center gap-3 rounded-[18px] bg-white p-2.5 pr-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,.5)] md:flex">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl" style={{ background: combo.tint }}>
                        <Image src={combo.image} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: combo.focus }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] text-ink">{combo.short}</p>
                        <p className="whitespace-nowrap text-[15px] font-bold text-ink">
                          {formatPrice(combo.price)}{" "}
                          <s className="text-[12px] font-normal text-muted">{formatPrice(combo.compareAt!)}</s>
                        </p>
                      </div>
                      <button
                        onClick={() => add(combo.id)}
                        aria-label={`Add ${combo.short} to bag`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105"
                      >
                        <IconPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* copy */}
              <div className="relative z-10 flex h-full flex-col justify-start px-6 pt-10 md:justify-center md:px-[7%] md:pt-0">
                <div className={`max-w-[560px] ${sl.dark ? "text-white" : "text-ink"}`}>
                  {active && (
                    <>
                      <p className="eyebrow animate-[fadeUp_.8s_var(--ease-out-expo)_both] opacity-80">{sl.eyebrow}</p>
                      <h1 className="heading mt-4 text-[2.6rem] animate-[fadeUp_.9s_var(--ease-out-expo)_.08s_both] md:mt-6 md:text-[5.2rem]">
                        {sl.title.map((t) => (
                          <span key={t} className="block">{t}</span>
                        ))}
                      </h1>
                      <p className={`mt-4 max-w-[420px] text-[15px] leading-relaxed animate-[fadeUp_.9s_var(--ease-out-expo)_.16s_both] md:mt-6 md:text-[17px] ${sl.dark ? "text-white/75" : "text-muted"}`}>
                        {sl.copy}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-4 animate-[fadeUp_.9s_var(--ease-out-expo)_.24s_both] md:mt-10">
                        <a href={sl.cta.href} className={`btn ${sl.dark ? "btn-white" : "btn-white"} h-12 px-7 md:h-[3.6rem] md:px-12`}>
                          {sl.cta.label}
                        </a>
                        {sl.layout === "cover" && (
                          <span className="hidden text-[15px] sm:inline">
                            <strong className="font-bold">{formatPrice(combo.price)}</strong>{" "}
                            <s className="text-muted">{formatPrice(combo.compareAt!)}</s>
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden items-center justify-between px-[7%] pb-8 md:flex">
          <div className={`flex items-center gap-4 ${s.dark ? "text-white" : "text-ink"}`}>
            <span className="text-[13px] font-semibold tracking-[0.2em]">
              0{i + 1} <span className="opacity-40">/ 0{slides.length}</span>
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, n) => (
                <button
                  key={n}
                  onClick={() => go(n)}
                  aria-label={`Go to slide ${n + 1}`}
                  className={`relative h-[3px] overflow-hidden rounded-full transition-all duration-500 ${
                    n === i ? "w-14" : "w-6"
                  } ${s.dark ? "bg-white/25" : "bg-ink/15"}`}
                >
                  {n === i && (
                    <span
                      key={`${i}-${paused}`}
                      className={`absolute inset-0 origin-left rounded-full ${s.dark ? "bg-white" : "bg-ink"}`}
                      style={{
                        animation: paused ? "none" : `progress ${DURATION}ms linear both`,
                        transform: paused ? "scaleX(1)" : undefined,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 z-20 flex gap-2 md:bottom-7 md:right-8">
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous slide"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)] transition hover:bg-ink hover:text-white md:h-14 md:w-14"
          >
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next slide"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)] transition hover:bg-ink hover:text-white md:h-14 md:w-14"
          >
            <IconArrow className="h-5 w-5" />
          </button>
        </div>
        {/* mobile dots */}
        <div className="absolute bottom-9 left-6 z-20 flex gap-1.5 md:hidden">
          {slides.map((_, n) => (
            <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-white" : "w-1.5 bg-white/60"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
