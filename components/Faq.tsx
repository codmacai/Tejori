"use client";

import { useState } from "react";
import { IconPlus } from "./Icons";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What is Neelayamari?",
    a: "Neelayamari (Indigofera tinctoria) is a herb long used in traditional Kerala hair oils. We combine it with coconut and other botanicals to nourish the scalp and roots.",
  },
  {
    q: "How often should I use the hair oil?",
    a: "Two to three times a week works well for most people. Massage it into the scalp and leave it on for at least an hour, or overnight, before washing with the Anti-Dandruff Shampoo.",
  },
  {
    q: "Is it suitable for my hair type?",
    a: "Yes — both the hair oil and shampoo are made for all hair types, from straight to curly.",
  },
  {
    q: "Can I use the shampoo every day?",
    a: "The shampoo is gentle enough for regular use. If your scalp is prone to flakes, use it consistently for a few weeks to see the best results.",
  },
  {
    q: "What’s in the Anti-Dandruff Combo?",
    a: "One Neelayamari Hair Oil (200 ml) and one Neelayamari Anti-Dandruff Shampoo (200 ml) — the complete ritual at a lower price than buying both separately.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-muted">Questions</p>
          <h2 className="heading mt-4 text-[2.25rem] text-ink md:text-[3.25rem]">Good to know</h2>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
            Can’t find what you’re looking for?{" "}
            <a href="#" className="font-medium text-ink underline underline-offset-4">Contact us</a>
          </p>
        </Reveal>

        <div className="border-t border-line md:col-span-7 md:col-start-6">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[18px] font-medium tracking-[-0.015em] text-ink md:text-[20px]">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${on ? "rotate-45 bg-ink text-white" : "bg-cloud text-ink"}`}>
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 pr-12 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
