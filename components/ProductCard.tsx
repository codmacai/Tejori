"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, savePct, type Product } from "@/lib/products";
import { benefitIcon } from "./benefitIcon";
import { IconCheck } from "./Icons";

export function ProductCard({ product: p, onLearnMore }: { product: Product; onLearnMore: (p: Product) => void }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const save = savePct(p);

  const onAdd = () => {
    add(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      id={p.id}
      className="group flex h-full w-full scroll-mt-32 flex-col rounded-[28px] bg-white p-5 shadow-[0_2px_14px_rgba(31,47,49,.04)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(31,47,49,.28)] md:p-7"
    >
      {/* heading */}
      <div className="px-1">
        <p className="text-[13px] font-semibold text-leaf">{p.badge?.label ?? "New"}</p>
        <h3 className="mt-1 text-[26px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:text-[28px]">{p.short}</h3>
        <p className="mt-1.5 text-[16px] leading-snug text-muted">{p.tagline}</p>
      </div>

      {/* image */}
      <button
        onClick={() => onLearnMore(p)}
        aria-label={`Quick look: ${p.name}`}
        className="relative mt-6 block aspect-square overflow-hidden rounded-[20px]"
        style={{ background: p.tint }}
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          style={{ objectPosition: p.focus }}
          placeholder="blur"
        />
        {save > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-ink backdrop-blur">
            Save {save}%
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
          Quick look
        </span>
      </button>

      {/* benefits */}
      <ul className="mt-6 grid grid-cols-3 gap-2 border-b border-line pb-6">
        {p.benefits.slice(0, 3).map((b) => {
          const I = benefitIcon(b);
          return (
            <li key={b} className="flex flex-col items-center gap-2 text-center">
              <I className="h-[22px] w-[22px] text-ink" />
              <span className="text-[12px] leading-tight text-muted">{b}</span>
            </li>
          );
        })}
      </ul>

      {/* price + actions */}
      <div className="mt-auto flex items-end justify-between gap-3 px-1 pt-6">
        <div>
          <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{formatPrice(p.price)}</p>
          <p className="mt-0.5 text-[13px] text-muted">
            {p.compareAt ? (
              <>
                MRP <s>{formatPrice(p.compareAt)}</s>
              </>
            ) : (
              p.size
            )}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={onAdd}
            className={`flex h-10 items-center gap-1.5 rounded-full px-5 text-[14px] font-medium text-white transition-colors duration-300 ${
              added ? "bg-leaf" : "bg-ink hover:bg-ink-deep"
            }`}
          >
            {added ? (
              <>
                <IconCheck className="h-4 w-4 animate-[pop_.4s_ease-out]" /> Added
              </>
            ) : (
              "Add to bag"
            )}
          </button>
          <button onClick={() => onLearnMore(p)} className="text-[14px] font-medium text-leaf hover:underline">
            Learn more ›
          </button>
        </div>
      </div>
    </article>
  );
}
