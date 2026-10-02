"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import ugc1 from "@/public/images/ugc-1.jpg";
import oilImg from "@/public/images/oil-lifestyle.jpg";
import shampooImg from "@/public/images/shampoo-lifestyle.jpg";
import comboImg from "@/public/images/hero-combo.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { IconCheck, IconPlus } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Shoppable stories. Replace with real customer photos or clips —
 * set `video` to an mp4 in /public to autoplay a muted loop instead of the image.
 */
const stories: { image: StaticImageData; video?: string; focus?: string; caption: string; productId: string }[] = [
  { image: ugc1, caption: "My weekly hair ritual", productId: "anti-dandruff-combo" },
  { image: oilImg, focus: "30% 50%", caption: "Oiling night", productId: "neelayamari-hair-oil" },
  { image: shampooImg, caption: "Wash day", productId: "neelayamari-anti-dandruff-shampoo" },
  { image: comboImg, focus: "55% 60%", caption: "Shelf favourites", productId: "anti-dandruff-combo" },
];

export function CustomerResults() {
  const { add } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  return (
    <section id="results" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Shop the look" title="Tejori, every day" sub="Moments from our community and our studio — tap + to add to bag." />
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:mx-0 md:mt-14 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
          {stories.map((s, k) => {
            const p = getProduct(s.productId)!;
            return (
              <Reveal key={k} delay={k * 80} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto">
                <div className="group relative aspect-[9/14] overflow-hidden rounded-[20px] bg-cloud">
                  {s.video ? (
                    <video src={s.video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <Image
                      src={s.image}
                      alt={s.caption}
                      fill
                      sizes="(min-width: 768px) 25vw, 68vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                      style={{ objectPosition: s.focus }}
                      placeholder="blur"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <p className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[12px] font-medium text-ink backdrop-blur">{s.caption}</p>

                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[14px] bg-white p-2 pr-2.5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px]" style={{ background: p.tint }}>
                      <Image src={p.image} alt="" fill sizes="44px" className="object-cover" style={{ objectPosition: p.focus }} />
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-[13px] text-ink">{p.short}</p>
                      <p className="mt-0.5 text-[14px] font-semibold text-ink">{formatPrice(p.price)}</p>
                    </div>
                    <button
                      onClick={() => {
                        add(p.id);
                        setAdded(k);
                        setTimeout(() => setAdded(null), 1500);
                      }}
                      aria-label={`Add ${p.name} to bag`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105"
                    >
                      {added === k ? <IconCheck className="h-4 w-4 animate-[pop_.4s_ease-out]" /> : <IconPlus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
