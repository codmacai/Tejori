"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, savePct, type Product } from "@/lib/products";
import { benefitIcon } from "./benefitIcon";
import { IconCheck, IconClose, IconMinus, IconPlus } from "./Icons";

/** Apple-style product sheet. */
export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [shown, setShown] = useState<Product | null>(product);
  const [qty, setQty] = useState(1);
  const open = !!product;

  useEffect(() => {
    if (product) {
      setShown(product);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const p = shown;
  const save = p ? savePct(p) : 0;

  return (
    <div className={`fixed inset-0 z-[55] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink-deep/35 backdrop-blur-md transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      {p && (
        <div className="absolute inset-0 flex items-end justify-center md:items-center md:p-8">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            className={`relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] bg-white transition-all duration-700 ease-[var(--ease-out-expo)] md:rounded-[32px] ${
              open ? "translate-y-0 opacity-100 md:scale-100" : "translate-y-10 opacity-0 md:scale-[0.97]"
            }`}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-cloud text-ink transition hover:bg-ink hover:text-white"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="p-3 md:p-4">
                <div className="relative aspect-square overflow-hidden rounded-[22px] md:aspect-auto md:h-full md:min-h-[520px] md:rounded-[24px]" style={{ background: p.tint }}>
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" style={{ objectPosition: p.focus }} />
                </div>
              </div>

              <div className="flex flex-col px-6 pb-8 pt-4 md:px-10 md:py-12">
                <p className="text-[13px] font-semibold text-leaf">{p.badge?.label}</p>
                <h3 className="mt-1 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] text-ink md:text-[36px]">{p.short}</h3>
                <p className="mt-2 text-[17px] text-muted">{p.tagline}</p>

                <p className="mt-6 text-[15.5px] leading-relaxed text-ink/80">{p.description}</p>

                <ul className="mt-6 space-y-3">
                  {p.benefits.map((b) => {
                    const I = benefitIcon(b);
                    return (
                      <li key={b} className="flex items-center gap-3 text-[15px] text-ink">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-mint">
                          <I className="h-[18px] w-[18px]" />
                        </span>
                        {b}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 border-t border-line pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[26px] font-semibold tracking-[-0.02em] text-ink">{formatPrice(p.price)}</span>
                    {p.compareAt && <s className="text-[15px] text-muted">{formatPrice(p.compareAt)}</s>}
                    {save > 0 && <span className="text-[14px] font-semibold text-leaf">Save {save}%</span>}
                  </div>
                  <p className="mt-1 text-[13px] text-muted">{p.size} · Inclusive of all taxes</p>

                  <div className="mt-6 flex gap-3">
                    <div className="flex items-center rounded-full bg-cloud">
                      <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-12 w-11 place-items-center text-ink">
                        <IconMinus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-[15px] font-semibold tabular-nums text-ink">{qty}</span>
                      <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-12 w-11 place-items-center text-ink">
                        <IconPlus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        add(p.id, qty);
                        onClose();
                      }}
                      className="btn btn-ink h-12 flex-1"
                    >
                      Add to bag — {formatPrice(p.price * qty)}
                    </button>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-[13px] text-muted">
                    <IconCheck className="h-4 w-4 text-leaf" /> Suitable for all hair types
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
