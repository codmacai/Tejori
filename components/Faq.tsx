"use client";

import { useState } from "react";
import { IconPlus } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

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
      <div className="container-x">
        <SectionHeading eyebrow="Questions" title="Good to know" />
        <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-16">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`rounded-[22px] bg-white transition-shadow duration-500 ${on ? "card-shadow" : ""}`}>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                  >
                    <span className="text-[17px] tracking-[-0.01em] text-ink md:text-[20px]">{f.q}</span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        on ? "rotate-45 bg-ink text-white" : "bg-cloud text-ink"
                      }`}
                    >
                      <IconPlus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pr-16 text-[15px] leading-relaxed text-muted md:px-8 md:pb-7">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
