"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

const combo = getProduct("anti-dandruff-combo")!;

/** Mobile-only buy bar that appears once the hero scrolls out of view. */
export function StickyCta() {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 760 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-[22px] bg-white p-2 shadow-[0_20px_50px_-15px_rgba(31,47,49,.45)] ring-1 ring-line">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px]" style={{ background: combo.tint }}>
          <Image src={combo.image} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: combo.focus }} />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] text-ink">{combo.short}</p>
          <p className="text-[14px] font-bold text-ink">
            {formatPrice(combo.price)} <s className="text-[11px] font-normal text-muted">{formatPrice(combo.compareAt!)}</s>
          </p>
        </div>
        <button onClick={() => add(combo.id)} className="h-11 rounded-full bg-ink px-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white">
          Add
        </button>
      </div>
    </div>
  );
}
