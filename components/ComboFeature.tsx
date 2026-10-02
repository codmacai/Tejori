"use client";

import Image from "next/image";
import { useState } from "react";
import duoImg from "@/public/images/duo-packshot.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, savePct } from "@/lib/products";
import { IconCheck, IconMinus, IconPlus } from "./Icons";
import { Reveal } from "./Reveal";

export function ComboFeature() {
  const { add } = useCart();
  const combo = getProduct("anti-dandruff-combo")!;
  const parts = [getProduct("neelayamari-hair-oil")!, getProduct("neelayamari-anti-dandruff-shampoo")!];
  const separately = parts.reduce((n, p) => n + p.price, 0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(combo.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section id="combo" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-20">
        {/* image */}
        <Reveal className="md:col-span-7">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#dce0c5] md:aspect-square">
            <Image
              src={duoImg}
              alt="Tejori Anti-Dandruff Combo — Neelayamari shampoo and hair oil"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-contain p-6 transition-transform duration-[2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] md:p-10"
              placeholder="blur"
            />
            <span className="absolute left-5 top-5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-white">
              Save {savePct(combo)}%
            </span>
          </div>
        </Reveal>

        {/* offer */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-muted">The combo</p>
            <h2 className="heading mt-4 text-[2.75rem] text-ink md:text-[4.25rem]">
              Better
              <br />
              together.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
              Oil to nourish the roots, shampoo to clear the scalp. The complete Neelayamari ritual — in one box.
            </p>
          </Reveal>

          {/* bundle maths */}
          <Reveal delay={120} className="mt-10">
            <ul>
              {parts.map((p, n) => (
                <li key={p.id}>
                  {n > 0 && (
                    <div className="flex items-center gap-4 py-1 pl-6 text-muted">
                      <IconPlus className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl" style={{ background: p.tint }}>
                      <Image src={p.image} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: p.focus }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] text-ink">{p.short}</p>
                      <p className="text-[13px] text-muted">{p.size}</p>
                    </div>
                    <p className="text-[15px] tabular-nums text-muted">{formatPrice(p.price)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-6">
              <div className="flex items-baseline justify-between text-[15px] text-muted">
                <span>Bought separately</span>
                <s className="tabular-nums">{formatPrice(separately)}</s>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-[15px] text-ink">Combo price</span>
                <span className="font-display text-[2.2rem] font-semibold tracking-[-0.02em] tabular-nums text-ink">{formatPrice(combo.price)}</span>
              </div>
              <p className="mt-1 text-right text-[13px] font-medium text-ink">You save {formatPrice(separately - combo.price)}</p>
            </div>

            <div className="mt-8 flex gap-3">
              <div className="flex items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-line)]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-14 w-12 place-items-center text-ink">
                  <IconMinus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-[15px] font-semibold tabular-nums text-ink" aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-14 w-12 place-items-center text-ink">
                  <IconPlus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={onAdd} className="btn btn-ink h-14 flex-1">
                {added ? (
                  <>
                    <IconCheck className="h-4 w-4" /> Added
                  </>
                ) : (
                  "Add combo to bag"
                )}
              </button>
            </div>
            <p className="mt-4 text-center text-[13px] text-muted">200 ml each · Suitable for all hair types</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
