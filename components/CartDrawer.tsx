"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_AT, formatPrice, getProduct, products } from "@/lib/products";
import { IconClose, IconMinus, IconPlus, IconShield, IconTruck } from "./Icons";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, subtotal, savings, count, add } = useCart();
  const remaining = FREE_SHIPPING_AT ? Math.max(0, FREE_SHIPPING_AT - subtotal) : 0;
  const progress = FREE_SHIPPING_AT ? Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100) : 0;
  const inBag = new Set(lines.map((l) => l.productId));
  const hasCombo = inBag.has("anti-dandruff-combo");
  const upsell = hasCombo ? undefined : products.find((p) => !inBag.has(p.id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-deep/30 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-white px-6 py-5">
          <p className="font-display text-[22px] font-medium tracking-[-0.02em] text-ink">
            Your bag <span className="text-muted">({count})</span>
          </p>
          <button onClick={close} aria-label="Close bag" className="grid h-10 w-10 place-items-center rounded-full bg-cloud text-ink hover:bg-ink hover:text-white">
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {FREE_SHIPPING_AT && lines.length > 0 && (
          <div className="bg-white px-6 pb-5">
            <p className="flex items-center gap-2 text-[13px] text-ink">
              <IconTruck className="h-4 w-4" />
              {remaining > 0 ? (
                <>Add <strong>{formatPrice(remaining)}</strong> more for free shipping</>
              ) : (
                <strong className="font-semibold">You’ve unlocked free shipping</strong>
              )}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cloud">
              <div className="h-full rounded-full bg-ink transition-all duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <p className="heading text-3xl text-ink">Your bag is empty</p>
                <p className="mt-3 text-muted">Start your Neelayamari ritual today.</p>
                <a href="#shop" onClick={close} className="btn btn-ink mt-8">Shop bestsellers</a>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => {
                const p = getProduct(l.productId)!;
                return (
                  <li key={l.productId} className="flex gap-4 rounded-[20px] bg-white p-3">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[14px]" style={{ background: p.tint }}>
                      <Image src={p.image} alt={p.name} fill sizes="96px" className="object-contain p-1" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-[15px] leading-snug text-ink">{p.name}</p>
                      <p className="mt-1 text-[12.5px] text-muted">{p.size}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full bg-cloud">
                          <button onClick={() => setQty(p.id, l.qty - 1)} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center text-ink">
                            <IconMinus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-[13px] font-semibold text-ink">{l.qty}</span>
                          <button onClick={() => setQty(p.id, l.qty + 1)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center text-ink">
                            <IconPlus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-[15px] font-bold text-ink">{formatPrice(p.price * l.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {lines.length > 0 && upsell && (
            <div className="mt-4 rounded-[20px] bg-mint p-4">
              <p className="eyebrow text-[10px] text-ink">You may also like</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={upsell.image} alt="" fill sizes="56px" className="object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-ink">{upsell.short}</p>
                  <p className="text-[14px] font-bold text-ink">{formatPrice(upsell.price)}</p>
                </div>
                <button onClick={() => add(upsell.id)} className="rounded-full bg-moss px-4 py-2.5 text-[13px] font-medium text-white hover:bg-moss-deep">
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="bg-white px-6 pb-6 pt-5">
            {savings > 0 && (
              <div className="mb-2 flex items-baseline justify-between text-[14px] text-ink">
                <span>You save</span>
                <span className="font-semibold">{formatPrice(savings)}</span>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] text-muted">Subtotal</span>
              <span className="text-[24px] font-bold text-ink">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[12px] text-muted">Taxes included. Shipping calculated at checkout.</p>
            <button className="btn btn-ink mt-5 h-14 w-full">Checkout</button>
            <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-muted">
              <IconShield className="h-4 w-4" /> Secure checkout
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
