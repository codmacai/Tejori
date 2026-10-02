"use client";

import { useEffect, useState } from "react";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

const hero = products[0];

/** Mobile-only buy bar that appears once the hero scrolls out of view. */
export function StickyCta() {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 600;
      setShow(window.scrollY > 700 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const size = hero.sizes[hero.sizes.length - 1];

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full bg-ink-deep/95 p-1.5 pl-5 text-bone shadow-2xl backdrop-blur">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-semibold">{hero.label} Serum</p>
          <p className="text-[11.5px] text-bone/60">
            ★ {hero.rating} · {formatPrice(size.price)}
          </p>
        </div>
        <button onClick={() => add(hero.id, size.label, size.price)} className="btn btn-light h-11 px-5 text-[13px]">
          Add to bag
        </button>
      </div>
    </div>
  );
}
