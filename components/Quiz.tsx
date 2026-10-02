"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, type Concern } from "@/lib/products";
import { Bottle } from "./Bottle";
import { IconArrow, IconRefresh } from "./Icons";
import { Reveal } from "./Reveal";

const questions = [
  {
    q: "What’s your hair type?",
    options: ["Straight", "Wavy", "Curly", "Coily"],
  },
  {
    q: "What bothers you most right now?",
    options: ["Hair fall", "Thinning", "Frizz", "Dandruff", "Damage", "Dryness"] as Concern[],
  },
  {
    q: "How often do you heat-style or colour?",
    options: ["Rarely", "Weekly", "Almost daily"],
  },
];

const recommendation: Record<Concern, string> = {
  "Hair fall": "root-revival-serum",
  Thinning: "rosemary-elixir",
  Frizz: "silk-conditioner",
  Dandruff: "neem-clarifier",
  Damage: "bond-shampoo",
  Dryness: "vault-mask",
};

export function Quiz() {
  const { add } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= questions.length;

  const choose = (opt: string) => {
    setAnswers((a) => [...a.slice(0, step), opt]);
    setStep((s) => s + 1);
  };

  const concern = answers[1] as Concern | undefined;
  const product = concern ? getProduct(recommendation[concern]) : undefined;
  const companion =
    answers[2] && answers[2] !== "Rarely" && product?.id !== "bond-shampoo"
      ? getProduct("bond-shampoo")
      : undefined;

  return (
    <section id="quiz" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="grain relative overflow-hidden rounded-[36px] bg-sand">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-clay/30 blur-3xl" />
          <div className="relative grid gap-10 p-6 md:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-5">
              <p className="eyebrow text-copper">The 60-second hair quiz</p>
              <h2 className="display mt-4 text-[2.5rem] text-ink-deep md:text-[3.6rem]">
                Not sure where
                <br />
                <span className="serif-accent text-[1.08em] text-ink">to begin?</span>
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-ink-deep/65">
                Answer three quick questions and our trichologist-built
                algorithm will match you to your ideal ritual — plus 10% off
                your first order.
              </p>

              <div className="mt-8 flex gap-2" aria-hidden>
                {questions.map((_, i) => (
                  <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/15">
                    <span
                      className="block h-full rounded-full bg-ink transition-all duration-700 ease-[var(--ease-out-expo)]"
                      style={{ width: step > i ? "100%" : "0%" }}
                    />
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-ink-deep/55">
                {done ? "Complete" : `Question ${step + 1} of ${questions.length}`}
              </p>
            </div>

            <div className="lg:col-span-7 lg:min-h-[340px]">
              {!done ? (
                <div key={step} className="animate-[fadeUp_.6s_var(--ease-out-expo)_both]">
                  <p className="display-sm text-2xl text-ink-deep md:text-[2rem]">{questions[step].q}</p>
                  <div className={`mt-7 grid grid-cols-2 gap-3 ${questions[step].options.length === 4 ? "" : "sm:grid-cols-3"}`}>
                    {questions[step].options.map((o) => (
                      <button
                        key={o}
                        onClick={() => choose(o)}
                        className={`group relative h-20 overflow-hidden rounded-2xl bg-cream px-4 text-left text-[15px] font-semibold text-ink-deep transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-ink hover:text-bone hover:shadow-[0_20px_40px_-20px_rgba(46,67,69,.7)] md:h-24 ${
                          answers[step] === o ? "ring-2 ring-ink" : ""
                        }`}
                      >
                        {o}
                        <IconArrow className="absolute bottom-3 right-3 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-[13px] font-medium text-ink-deep/60 underline underline-offset-4 hover:text-ink-deep">
                      ← Back
                    </button>
                  )}
                </div>
              ) : (
                product && (
                  <div className="animate-[fadeUp_.7s_var(--ease-out-expo)_both]">
                    <p className="text-[14px] text-ink-deep/60">
                      For {answers[0].toLowerCase()} hair with {concern?.toLowerCase()}, your match is
                    </p>
                    <div className="mt-4 flex flex-col gap-6 rounded-[28px] bg-cream p-5 sm:flex-row sm:items-center md:p-6">
                      <div
                        className="grid h-48 shrink-0 place-items-center rounded-[20px] sm:w-44"
                        style={{ background: product.palette.stage }}
                      >
                        <Bottle shape={product.shape} {...product.palette} name={product.label} className="h-40 w-auto drop-shadow-[0_20px_20px_rgba(0,0,0,.25)]" />
                      </div>
                      <div className="flex-1">
                        <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-bone">Your perfect match</span>
                        <h3 className="display-sm mt-3 text-[1.7rem] text-ink-deep">{product.name}</h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-deep/65">{product.tagline}</p>
                        {companion && (
                          <p className="mt-3 text-[13px] text-ink-deep/70">
                            + Because you heat-style {answers[2].toLowerCase()}, pair it with{" "}
                            <strong className="font-semibold text-ink-deep">{companion.name}</strong>.
                          </p>
                        )}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => {
                              add(product.id, product.sizes[0].label, Math.round(product.sizes[0].price * 0.9));
                              if (companion) add(companion.id, companion.sizes[0].label, Math.round(companion.sizes[0].price * 0.9));
                            }}
                            className="btn btn-primary"
                          >
                            Add {companion ? "my ritual" : "to bag"} · 10% off
                          </button>
                          <span className="text-[13px] text-ink-deep/55">
                            from {formatPrice(Math.round(product.sizes[0].price * 0.9))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStep(0);
                        setAnswers([]);
                      }}
                      className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink-deep/60 hover:text-ink-deep"
                    >
                      <IconRefresh className="h-4 w-4" /> Retake the quiz
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
