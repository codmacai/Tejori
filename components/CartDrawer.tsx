"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_AT, formatPrice, getProduct, products } from "@/lib/products";
import { Bottle } from "./Bottle";
import { IconClose, IconMinus, IconPlus, IconShield, IconTruck } from "./Icons";

export function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count, add } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);
  const inCart = new Set(lines.map((l) => l.productId));
  const upsell = products.find((p) => !inCart.has(p.id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-deep/40 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-cream transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="display text-2xl">
            Your bag <span className="serif-accent text-ink/50">({count})</span>
          </p>
          <button onClick={close} aria-label="Close bag" className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5">
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-line px-6 py-4">
          <p className="flex items-center gap-2 text-[13px] text-ink-deep">
            <IconTruck className="h-4 w-4 text-copper" />
            {remaining > 0 ? (
              <>You’re <strong>{formatPrice(remaining)}</strong> away from free express shipping</>
            ) : (
              <strong>You’ve unlocked free express shipping ✦</strong>
            )}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-ink transition-all duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="display text-3xl">Your vault is empty.</p>
                <p className="mt-2 text-ink-deep/60">Let’s find your hair’s new favourite thing.</p>
                <a href="#shop" onClick={close} className="btn btn-primary mt-6">Shop bestsellers</a>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const p = getProduct(l.productId)!;
                return (
                  <li key={l.key} className="flex gap-4 py-4">
                    <span className="grid h-24 w-20 shrink-0 place-items-center rounded-2xl" style={{ background: p.palette.stage }}>
                      <Bottle shape={p.shape} {...p.palette} name={p.label} className="h-20 w-auto" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <p className="text-[14.5px] font-semibold leading-tight">{p.name}</p>
                        <p className="shrink-0 text-[14.5px] font-semibold">{formatPrice(l.price * l.qty)}</p>
                      </div>
                      <p className="mt-1 text-[12.5px] text-ink-deep/55">{l.size}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full ring-1 ring-line">
                          <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center">
                            <IconMinus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-[13px] font-semibold">{l.qty}</span>
                          <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center">
                            <IconPlus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => remove(l.key)} className="text-[12px] text-ink-deep/50 underline underline-offset-4 hover:text-ink-deep">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {lines.length > 0 && upsell && (
            <div className="mt-4 rounded-2xl bg-bone p-4">
              <p className="eyebrow text-[10px] text-copper">Complete your ritual</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-14 w-12 shrink-0 place-items-center rounded-xl" style={{ background: upsell.palette.stage }}>
                  <Bottle shape={upsell.shape} {...upsell.palette} name={upsell.label} className="h-12 w-auto" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold">{upsell.name}</p>
                  <p className="text-[12px] text-ink-deep/55">{formatPrice(upsell.sizes[0].price)}</p>
                </div>
                <button
                  onClick={() => add(upsell.id, upsell.sizes[0].label, upsell.sizes[0].price)}
                  className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-bone hover:bg-ink-deep"
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 pb-6 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-ink-deep/65">Subtotal</span>
              <span className="display text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[12px] text-ink-deep/50">Taxes included. Shipping calculated at checkout.</p>
            <button className="btn btn-primary mt-5 h-14 w-full text-[15px]">Checkout securely</button>
            <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-ink-deep/55">
              <IconShield className="h-4 w-4" /> UPI · Cards · COD · 60-day money-back promise
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
