"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import ugc1 from "@/public/images/ugc-1.jpg";
import oilImg from "@/public/images/oil-lifestyle.jpg";
import shampooImg from "@/public/images/shampoo-lifestyle.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { IconArrow, IconCheck, IconPlus } from "./Icons";
import { SectionHeading } from "./SectionHeading";

/**
 * Shoppable "stories". Add real customer photos/videos here —
 * set `video` to an mp4 in /public to play a clip instead of the image.
 */
const stories: {
  image: StaticImageData;
  video?: string;
  focus?: string;
  title: string;
  productId: string;
}[] = [
  { image: oilImg, focus: "30% 50%", title: "Tejori Neelayamari Hair Oil", productId: "neelayamari-hair-oil" },
  { image: ugc1, title: "Tejori Neelayamari Shampoo", productId: "neelayamari-anti-dandruff-shampoo" },
  { image: shampooImg, title: "Anti-Dandruff Combo", productId: "anti-dandruff-combo" },
];

export function CustomerResults() {
  const { add } = useCart();
  const [active, setActive] = useState(1);
  const [added, setAdded] = useState<string | null>(null);
  const n = stories.length;
  const go = (k: number) => setActive((k + n) % n);

  return (
    <section id="results" className="scroll-mt-24 overflow-hidden py-16 md:py-20">
      <div className="container-x">
        <SectionHeading title="Real Customer Results" />

        <div className="relative mx-auto mt-12 h-[calc(68vw*17.5/9+12px)] max-h-[680px] max-w-[1100px] md:mt-16 md:h-[712px] md:max-h-none">
          {stories.map((s, k) => {
            let pos = k - active;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;
            const on = pos === 0;
            const p = getProduct(s.productId)!;
            return (
              <div
                key={s.title}
                onClick={() => !on && go(k)}
                className={`absolute left-1/2 top-0 w-[68vw] max-w-[340px] transition-all duration-[900ms] ease-[var(--ease-out-expo)] md:w-[360px] md:max-w-none ${
                  on ? "z-20 cursor-default" : "z-10 cursor-pointer"
                }`}
                style={{
                  transform: `translateX(calc(-50% + ${pos * 112}%)) scale(${on ? 1 : 0.9})`,
                  opacity: Math.abs(pos) > 1 ? 0 : 1,
                }}
              >
                <div
                  className={`relative aspect-[9/17.5] overflow-hidden rounded-[44px] border-[6px] bg-ink-deep transition-shadow duration-700 ${
                    on
                      ? "border-ink-deep shadow-[0_50px_80px_-40px_rgba(31,47,49,.7)]"
                      : "border-ink-deep/40 shadow-none"
                  }`}
                >
                  {s.video ? (
                    <video src={s.video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="360px"
                      className={`object-cover transition-[filter] duration-700 ${on ? "" : "blur-[3px]"}`}
                      style={{ objectPosition: s.focus }}
                      placeholder="blur"
                    />
                  )}
                  <div className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-transparent" : "bg-white/35"}`} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* status bar */}
                  <div className={`absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-4 text-[12px] font-semibold text-white transition-opacity ${on ? "opacity-100" : "opacity-0"}`}>
                    <span>9:41</span>
                    <span className="h-7 w-24 rounded-full bg-black" />
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-4 rounded-[3px] border border-white/80" />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="eyebrow px-2 text-[11px] text-white/85">Hair ritual</p>
                    <p className="mt-2 px-2 text-[22px] leading-tight tracking-[-0.02em]">{s.title}</p>
                    <div className="mt-4 flex items-center gap-3 rounded-[18px] bg-white p-2 pr-2.5 text-ink">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ background: p.tint }}>
                        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: p.focus }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px]">{p.name}</p>
                        <p className="text-[15px] font-bold">
                          {formatPrice(p.price)}{" "}
                          {p.compareAt && <s className="text-[11px] font-normal text-muted">{formatPrice(p.compareAt)}</s>}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          add(p.id);
                          setAdded(p.id);
                          setTimeout(() => setAdded(null), 1500);
                        }}
                        tabIndex={on ? 0 : -1}
                        aria-label={`Add ${p.name} to bag`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105"
                      >
                        {added === p.id ? <IconCheck className="h-4 w-4 animate-[pop_.4s_ease-out]" /> : <IconPlus className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button onClick={() => go(active - 1)} aria-label="Previous story" className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white">
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>
          <div className="flex gap-1.5">
            {stories.map((_, k) => (
              <span key={k} className={`h-1.5 rounded-full transition-all duration-500 ${k === active ? "w-7 bg-ink" : "w-1.5 bg-ink/25"}`} />
            ))}
          </div>
          <button onClick={() => go(active + 1)} aria-label="Next story" className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white">
            <IconArrow className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
