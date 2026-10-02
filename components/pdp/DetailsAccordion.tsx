"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

/** Animated plus that turns into a minus when open. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span className="relative h-4 w-4 shrink-0" aria-hidden>
      <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-ink" />
      <span
        className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

function Item({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border-b border-ink/15">
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6">
        <span className="text-[17px] font-medium tracking-[-0.01em] text-ink md:text-[18px]">{title}</span>
        <Toggle open={open} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-6 text-[15.5px] leading-relaxed text-ink/75">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DetailsAccordion({ product: p }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(0);
  const d = p.details;
  const toggle = (i: number) => setOpen((o) => (o === i ? null : i));

  return (
    <div className="mt-8 border-t border-ink/15">
      <Item title="Product description" open={open === 0} onToggle={() => toggle(0)}>
        <p>{p.description}</p>
        <p className="mt-4 text-[13.5px] text-muted">{p.size} · {p.tagline}</p>
      </Item>

      <Item title="Key benefits" open={open === 1} onToggle={() => toggle(1)}>
        <ul className="space-y-3">
          {d.why.map((w) => (
            <li key={w.title} className="flex gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
              <span>
                <span className="text-ink">{w.title}.</span> {w.copy}
              </span>
            </li>
          ))}
        </ul>
      </Item>

      <Item title="Key ingredients" open={open === 2} onToggle={() => toggle(2)}>
        <ul className="space-y-4">
          {d.ingredients.map((ing) => (
            <li key={ing.name} className="flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                <Image src={ing.image} alt={ing.name} fill sizes="56px" className="object-cover" />
              </span>
              <span className="leading-snug">
                <span className="block text-ink">
                  {ing.name}
                  {ing.latin && <span className="ml-2 text-[13px] text-muted">{ing.latin}</span>}
                </span>
                <span className="block text-[14.5px]">{ing.copy}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13.5px] text-muted">Full ingredient list is printed on the pack.</p>
      </Item>

      <Item title="Suited for" open={open === 3} onToggle={() => toggle(3)}>
        <ul className="space-y-2">
          {d.suitedFor.map((s) => (
            <li key={s} className="flex gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
              {s}
            </li>
          ))}
        </ul>
      </Item>
    </div>
  );
}
