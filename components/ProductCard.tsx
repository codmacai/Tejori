"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, savePct, type Product } from "@/lib/products";
import { IconCheck, IconPlus } from "./Icons";

export function ProductCard({ product: p, tab }: { product: Product; tab?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const save = savePct(p);
  const tabText = tab ?? (save ? `You save ${save}% today` : undefined);

  const onAdd = () => {
    add(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article id={p.id} className="group flex h-full w-full flex-col scroll-mt-32">
      {/* top tab */}
      <div
        className={`rounded-t-[30px] px-5 pb-8 pt-3 text-center text-[15px] text-ink ${
          tabText ? (save ? "bg-mint" : "bg-sage") : "invisible"
        }`}
      >
        {tabText ?? "—"}
      </div>

      <div className="card-shadow -mt-6 flex flex-1 flex-col rounded-[30px] bg-white p-3 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
        {/* image */}
        <div className="relative aspect-square overflow-hidden rounded-[22px]" style={{ background: p.tint }}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            style={{ objectPosition: p.focus }}
            placeholder="blur"
          />

          {p.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] ${
                p.badge.tone === "sage" ? "bg-sage text-ink" : "bg-ink text-white"
              }`}
            >
              {p.badge.label}
            </span>
          )}

          <button
            onClick={onAdd}
            aria-label={`Quick add ${p.name}`}
            className={`absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full shadow-sm transition duration-500 hover:scale-110 ${
              p.badge?.tone === "ink" ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            {added ? <IconCheck className="h-5 w-5 animate-[pop_.4s_ease-out]" /> : <IconPlus className="h-5 w-5" />}
          </button>

          {/* benefits reveal */}
          <ul className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
            {p.benefits.slice(0, 3).map((b, n) => (
              <li
                key={b}
                className="translate-y-3 rounded-full bg-white/85 px-3 py-1.5 text-[12px] text-ink opacity-0 backdrop-blur transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: `${n * 70}ms` }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* details */}
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[20px] leading-snug tracking-[-0.01em] text-ink md:text-[22px]">{p.name}</h3>
            <div className="shrink-0 text-right">
              <p className="text-[20px] font-bold text-ink md:text-[22px]">{formatPrice(p.price)}</p>
              {p.compareAt && <s className="text-[14px] text-muted">{formatPrice(p.compareAt)}</s>}
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{p.size} · {p.description}</p>

          <div className="min-h-5 flex-1" />
          <button
            onClick={onAdd}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
              added ? "bg-ink text-white" : "text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-ink hover:text-white"
            }`}
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
      </div>
    </article>
  );
}
