"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, savePct, type Product } from "@/lib/products";
import { IconCheck, IconPlus } from "./Icons";

export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const save = savePct(p);

  const onAdd = () => {
    add(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article id={p.id} className="group flex h-full w-full scroll-mt-32 flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]" style={{ background: p.tint }}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          style={{ objectPosition: p.focus }}
          placeholder="blur"
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          {p.badge ? (
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink backdrop-blur">{p.badge.label}</span>
          ) : (
            <span />
          )}
          {save > 0 && <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white">−{save}%</span>}
        </div>

        <button
          onClick={onAdd}
          aria-label={`Quick add ${p.name}`}
          className="absolute bottom-4 right-4 flex h-12 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-ink shadow-[0_10px_30px_-12px_rgba(31,47,49,.45)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-ink hover:text-white md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          {added ? <IconCheck className="h-4 w-4 animate-[pop_.4s_ease-out]" /> : <IconPlus className="h-4 w-4" />}
          {added ? "Added" : "Quick add"}
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[19px] font-medium leading-snug tracking-[-0.015em] text-ink">{p.name}</h3>
        </div>
        <p className="mt-1.5 text-[14px] text-muted">
          {p.size} · {p.benefits[1]}
        </p>
        <p className="mt-3 flex items-baseline gap-2.5">
          <span className="text-[17px] font-semibold text-ink">{formatPrice(p.price)}</span>
          {p.compareAt && <s className="text-[14px] text-muted">{formatPrice(p.compareAt)}</s>}
        </p>
        <div className="min-h-5 flex-1" />
        <button
          onClick={onAdd}
          className={`btn h-12 w-full ${added ? "btn-ink" : "btn-outline"}`}
        >
          {added ? (
            <>
              <IconCheck className="h-4 w-4" /> Added to bag
            </>
          ) : (
            "Add to bag"
          )}
        </button>
      </div>
    </article>
  );
}
