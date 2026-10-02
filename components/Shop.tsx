"use client";

import { useMemo, useState } from "react";
import { concerns, products, type Concern } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export function Shop() {
  const [active, setActive] = useState<Concern | "All">("All");
  const list = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.concern === active)),
    [active],
  );

  return (
    <section id="shop" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-copper">The bestsellers</p>
            <h2 className="display mt-4 text-[2.7rem] text-ink-deep md:text-[4rem]">
              Treasured formulas,
              <br />
              <span className="serif-accent text-[1.08em] text-ink">sorted by concern.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-sm text-ink-deep/65">
            Every formula is built around one hero botanical and one clinically
            studied active — so you know exactly what’s working, and why.
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter by concern">
          {(["All", ...concerns] as const).map((c) => {
            const n = c === "All" ? products.length : products.filter((p) => p.concern === c).length;
            const on = c === active;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  on
                    ? "bg-ink text-bone shadow-[0_10px_24px_-12px_rgba(46,67,69,.8)]"
                    : "bg-bone text-ink-deep hover:bg-sand"
                }`}
              >
                {c}
                <span className={`text-[11px] ${on ? "text-bone/60" : "text-ink-deep/40"}`}>{n}</span>
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className="no-scrollbar -mx-5 mt-10 flex scroll-px-5 snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-14 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {list.map((p, i) => (
            <div
              key={p.id}
              className="flex w-[84%] shrink-0 snap-start animate-[fadeUp_.9s_var(--ease-out-expo)_both] sm:w-[60%] md:w-auto"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
