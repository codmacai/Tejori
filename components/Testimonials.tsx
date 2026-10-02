"use client";

import Image from "next/image";
import { useState } from "react";
import duoImg from "@/public/images/duo-packshot.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { IconArrow, Stars } from "./Icons";
import { SectionHeading } from "./SectionHeading";

// Placeholder reviews — replace with verified customer reviews before launch.
const reviews = [
  {
    quote: "My hair fall has reduced so much. The oil smells lovely and my hair feels thicker and softer after every wash.",
    name: "Anjali R.",
    productId: "neelayamari-hair-oil",
    image: getProduct("neelayamari-hair-oil")!.image,
    bg: "#d9e8e3",
  },
  {
    quote: "Dandruff was a constant battle for me. Two weeks with the shampoo and my scalp finally feels clean and calm.",
    name: "Rahul M.",
    productId: "neelayamari-anti-dandruff-shampoo",
    image: getProduct("neelayamari-anti-dandruff-shampoo")!.image,
    bg: "#e4efec",
  },
  {
    quote: "I use the combo every weekend — oil the night before, wash in the morning. Simple ritual, beautiful results.",
    name: "Sneha K.",
    productId: "anti-dandruff-combo",
    image: duoImg,
    bg: "#dce0c5",
  },
];

export function Testimonials() {
  const { add } = useCart();
  const [i, setI] = useState(0);
  const go = (k: number) => setI((k + reviews.length) % reviews.length);

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="What they say" title="Loved by our community" />
        <p className="mt-6 text-center text-[13px] font-semibold tracking-[0.25em] text-ink">
          0{i + 1} <span className="text-ink/40">/ 0{reviews.length}</span>
        </p>

        <div className="relative mx-auto mt-10 max-w-[1170px] md:mt-14">
          <div
            className="flex transition-transform duration-[900ms] ease-[var(--ease-out-expo)]"
            style={{ transform: `translateX(calc(${-i} * (100% + 2rem)))`, gap: "2rem" }}
          >
            {reviews.map((r, k) => {
              const p = getProduct(r.productId)!;
              return (
                <article
                  key={r.name}
                  aria-hidden={k !== i}
                  className={`card-shadow grid w-full min-w-0 shrink-0 grid-cols-1 gap-6 rounded-[28px] bg-white p-3 transition-opacity duration-700 md:grid-cols-[1.05fr_1fr] md:gap-12 md:p-4 ${
                    k === i ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] md:aspect-auto md:min-h-[420px]" style={{ background: r.bg }}>
                    <Image src={r.image} alt={p.name} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" style={{ objectPosition: p.focus }} placeholder="blur" />
                    <span className="absolute left-4 top-4 rounded-full bg-sage px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
                      Verified buyer
                    </span>
                  </div>
                  <div className="flex flex-col px-3 pb-4 md:py-10 md:pr-10">
                    <Stars value={5} className="text-ink [&_svg]:h-5 [&_svg]:w-5" />
                    <blockquote className="mt-6 text-[20px] leading-[1.55] tracking-[-0.01em] text-ink md:text-[26px]">
                      {r.quote}
                    </blockquote>
                    <p className="eyebrow mt-6 text-ink">{r.name}</p>
                    <div className="mt-8 flex items-center gap-4 rounded-[18px] bg-cloud p-2.5 md:mt-auto">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl" style={{ background: p.tint }}>
                        <Image src={p.image} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: p.focus }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] text-ink">{p.name}</p>
                        <p className="text-[17px] font-bold text-ink">
                          {formatPrice(p.price)}{" "}
                          {p.compareAt && <s className="text-[13px] font-normal text-muted">{formatPrice(p.compareAt)}</s>}
                        </p>
                      </div>
                      <button
                        onClick={() => add(p.id)}
                        tabIndex={k === i ? 0 : -1}
                        aria-label={`Add ${p.name} to bag`}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:scale-105"
                      >
                        <IconArrow className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(i - 1)} aria-label="Previous review" className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white">
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>
          <div className="flex gap-1.5">
            {reviews.map((_, k) => (
              <button key={k} onClick={() => go(k)} aria-label={`Review ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-7 bg-ink" : "w-1.5 bg-ink/25"}`} />
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="Next review" className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white">
            <IconArrow className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
