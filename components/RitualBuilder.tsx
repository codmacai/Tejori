"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, products, type Product } from "@/lib/products";
import { Bottle } from "./Bottle";
import { IconArrow, IconCheck } from "./Icons";
import { Reveal } from "./Reveal";

const BUNDLE_DISCOUNT = 0.2;

const steps: { title: string; hint: string; options: Product["id"][] }[] = [
  { title: "Cleanse", hint: "Reset the scalp", options: ["bond-shampoo", "neem-clarifier"] },
  { title: "Treat", hint: "Target your concern", options: ["root-revival-serum", "rosemary-elixir"] },
  { title: "Seal", hint: "Lock in softness", options: ["silk-conditioner", "vault-mask"] },
];

const byId = (id: string) => products.find((p) => p.id === id)!;

export function RitualBuilder() {
  const { add } = useCart();
  const [picks, setPicks] = useState<string[]>(steps.map((s) => s.options[0]));
  const chosen = picks.map(byId);
  const total = chosen.reduce((n, p) => n + p.sizes[0].price, 0);
  const discounted = Math.round(total * (1 - BUNDLE_DISCOUNT));

  const addRitual = () => {
    chosen.forEach((p) => add(p.id, p.sizes[0].label, Math.round(p.sizes[0].price * (1 - BUNDLE_DISCOUNT))));
  };

  return (
    <section id="ritual" className="scroll-mt-24 bg-ink py-20 text-bone md:py-28">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-clay">Build your ritual</p>
          <h2 className="display mt-4 text-[2.7rem] md:text-[4rem]">
            Three steps.
            <br />
            <span className="serif-accent text-[1.08em] text-clay">One saved 20%.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-bone/70">
            Formulas designed to work as a system deliver up to 2× the results
            of using one product alone. Pick one from each step — we’ll take 20%
            off the whole ritual.
          </p>

          {/* live stack */}
          <div className="relative mt-10 flex h-56 items-end gap-2 rounded-[28px] bg-ink-deep/60 px-6 pb-6 pt-8">
            {chosen.map((p, i) => (
              <div key={p.id + i} className="flex-1 animate-[fadeUp_.7s_var(--ease-out-expo)_both]">
                <Bottle shape={p.shape} {...p.palette} name={p.label} className="mx-auto h-32 w-auto drop-shadow sm:h-40-[0_20px_20px_rgba(0,0,0,.4)]" />
              </div>
            ))}
            <span className="absolute right-5 top-5 rounded-full bg-clay px-3 py-1 text-[11px] font-bold text-ink-deep">
              −20%
            </span>
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-7">
          <ol className="space-y-4">
            {steps.map((s, si) => (
              <Reveal as="li" key={s.title} delay={si * 90} className="rounded-[24px] border border-bone/10 bg-bone/[0.04] p-4 md:p-5">
                <div className="mb-4 flex items-baseline gap-3 px-1">
                  <span className="serif-accent text-2xl text-clay">0{si + 1}</span>
                  <span className="display-sm text-xl">{s.title}</span>
                  <span className="text-sm text-bone/50">— {s.hint}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {s.options.map((id) => {
                    const p = byId(id);
                    const on = picks[si] === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setPicks((prev) => prev.map((v, i) => (i === si ? id : v)))}
                        aria-pressed={on}
                        className={`group flex items-center gap-4 rounded-2xl p-3 text-left transition-all duration-500 ease-[var(--ease-out-expo)] ${
                          on ? "bg-bone text-ink-deep" : "bg-transparent text-bone hover:bg-bone/[0.07]"
                        }`}
                      >
                        <span
                          className="grid h-16 w-14 shrink-0 place-items-center rounded-xl"
                          style={{ background: p.palette.stage }}
                        >
                          <Bottle shape={p.shape} {...p.palette} name={p.label} className="h-14 w-auto" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14.5px] font-semibold leading-tight">{p.name}</span>
                          <span className={`mt-1 block text-[12.5px] ${on ? "text-ink-deep/60" : "text-bone/50"}`}>
                            {p.sizes[0].label} · {formatPrice(p.sizes[0].price)}
                          </span>
                        </span>
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition ${
                            on ? "bg-ink text-bone" : "border border-bone/30"
                          }`}
                        >
                          {on && <IconCheck className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-clay p-5 text-ink-deep sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="text-sm font-medium opacity-70">Your ritual · 3 full sizes</p>
              <p className="mt-1 flex items-baseline gap-3">
                <span className="display text-4xl">{formatPrice(discounted)}</span>
                <s className="text-lg opacity-50">{formatPrice(total)}</s>
              </p>
              <p className="mt-1 text-[13px] font-semibold">You save {formatPrice(total - discounted)} + free shipping</p>
            </div>
            <button onClick={addRitual} className="btn btn-primary group w-full sm:w-auto">
              Add ritual to bag
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
