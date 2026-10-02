"use client";

import { useState } from "react";
import { IconPlus } from "./Icons";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "How soon will I see results?",
    a: "Most people notice softer, shinier hair from the first wash. For hair fall and density, our studies show visible change at 4 weeks and peak results at 8–12 weeks of consistent use — hair grows in cycles, so patience pays.",
  },
  {
    q: "Is Tejori safe for colour-treated or keratin-treated hair?",
    a: "Yes. Every formula is sulphate-free, pH-balanced and colour-safe, so it won’t strip dye or smoothing treatments.",
  },
  {
    q: "Which products should I start with?",
    a: "Take our 60-second hair quiz for a personalised match. If you’d rather choose yourself, the 3-step ritual (Cleanse → Treat → Seal) gives the best results and saves you 20%.",
  },
  {
    q: "Are your products suitable for sensitive scalps?",
    a: "All formulas are dermatologist tested and free from parabens, mineral oils and harsh sulphates. If you have a known allergy, check the full ingredient list on each product page and patch test first.",
  },
  {
    q: "What if it doesn’t work for me?",
    a: "Try it for 60 days. If you don’t love your hair, we’ll refund you in full — even if the bottle is empty. No forms, no fuss.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship across India with free express delivery over ₹999, and to 30+ countries worldwide. Duties are calculated at checkout.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-copper">Questions</p>
          <h2 className="display mt-4 text-[2.5rem] text-ink-deep md:text-[3.6rem]">
            Good to
            <span className="serif-accent text-[1.08em] text-ink"> know.</span>
          </h2>
          <p className="mt-5 max-w-xs text-ink-deep/65">
            Still curious? Our hair experts reply within 2 hours on{" "}
            <a href="#" className="font-semibold text-ink underline underline-offset-4">WhatsApp</a>.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 50} className="border-b border-line">
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display-sm text-[1.15rem] text-ink-deep md:text-[1.4rem]">{f.q}</span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      on ? "rotate-45 bg-ink text-bone" : "bg-bone text-ink"
                    }`}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-14 leading-relaxed text-ink-deep/65">{f.a}</p>
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
