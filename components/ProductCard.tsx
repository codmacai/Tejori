"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, savePct, type Product } from "@/lib/products";
import { IconCheck, IconPlus } from "./Icons";

/** Minimal floating-product card: soft panel, centred product, big price, round add button. */
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
    <article
      id={p.id}
      className="group relative flex h-full w-full scroll-mt-32 flex-col rounded-[36px] bg-card px-6 pb-7 pt-6 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-2"
    >
      {save > 0 && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-white/60 px-3 py-1 text-[13px] text-ink backdrop-blur">
          Save {save}%
        </span>
      )}

      {/* product */}
      <Link href={`/products/${p.id}`} aria-label={`View ${p.name}`} className="relative mx-auto block aspect-[4/5] w-full max-w-[300px]">
        <span className="absolute inset-x-[22%] bottom-[6%] h-6 rounded-[50%] bg-ink-deep/25 blur-xl transition-all duration-700 group-hover:inset-x-[28%] group-hover:opacity-60" />
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 300px, 70vw"
          className="object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3 group-hover:scale-[1.04]"
          placeholder="blur"
        />
      </Link>

      {/* details */}
      <h3 className="mt-2 text-[22px] font-normal tracking-[-0.01em] text-ink md:text-[24px]"><Link href={`/products/${p.id}`} className="hover:underline hover:underline-offset-4">{p.short}</Link></h3>
      <p className="mt-1 text-[15px] text-muted">{p.size}</p>

      <div className="relative mt-6 flex items-center justify-center">
        <p className="text-[34px] font-normal leading-none tracking-[-0.02em] text-ink md:text-[38px]">
          {formatPrice(p.price).replace(".00", "")}
        </p>
        <button
          onClick={onAdd}
          aria-label={`Add ${p.name} to bag`}
          className={`absolute right-0 grid h-14 w-14 place-items-center rounded-full text-white transition-all duration-500 hover:scale-105 ${
            added ? "bg-accent-soft" : "bg-accent hover:bg-accent-deep"
          }`}
        >
          {added ? <IconCheck className="h-5 w-5 animate-[pop_.4s_ease-out]" /> : <IconPlus className="h-5 w-5" />}
        </button>
      </div>
      <p className={`mt-2 text-[13px] text-muted ${p.compareAt ? "" : "invisible"}`}>
        <s>{p.compareAt ? formatPrice(p.compareAt).replace(".00", "") : "—"}</s>
      </p>
    </article>
  );
}
