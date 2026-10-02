"use client";

import Image from "next/image";
import { useState } from "react";
import oilImg from "@/public/images/oil-lifestyle.jpg";
import shampooImg from "@/public/images/shampoo-lifestyle.jpg";
import comboImg from "@/public/images/hero-combo.jpg";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Oil",
    copy: "Massage Neelayamari Hair Oil into your scalp and lengths. Leave it on for an hour — or overnight for a deeper treat.",
    image: oilImg,
    focus: "35% 50%",
  },
  {
    n: "02",
    title: "Wash",
    copy: "Work the Anti-Dandruff Shampoo into wet hair, massage the scalp gently, then rinse well.",
    image: shampooImg,
    focus: "50% 50%",
  },
  {
    n: "03",
    title: "Repeat",
    copy: "Follow the ritual two to three times a week for roots that feel stronger and a scalp that stays clear.",
    image: comboImg,
    focus: "50% 65%",
  },
];

export function Ritual() {
  const { add } = useCart();
  const combo = getProduct("anti-dandruff-combo")!;
  const [active, setActive] = useState(0);

  return (
    <section className="py-6 md:py-10">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[28px] bg-white md:grid-cols-2 md:rounded-[36px]">
          {/* image stack */}
          <div className="flex items-center justify-center bg-mint p-3 md:p-10">
          <div className="relative aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[22px] md:rounded-[26px]">
            {steps.map((s, i) => (
              <Image
                key={s.n}
                src={s.image}
                alt={`Step ${s.n}: ${s.title}`}
                fill
                sizes="(min-width: 768px) 560px, 100vw"
                className={`object-cover transition-all duration-[1.1s] ease-[var(--ease-out-expo)] ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
                style={{ objectPosition: s.focus }}
                placeholder="blur"
              />
            ))}
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur">
              Step {steps[active].n}
            </span>
          </div>
          </div>

          {/* steps */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-14 lg:px-20">
            <Reveal>
              <p className="eyebrow text-ink/80">How to use</p>
              <h2 className="heading mt-5 text-[2.4rem] text-ink md:text-[3.4rem]">Your three-step hair ritual</h2>
            </Reveal>

            <ol className="mt-10">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.n} className="border-t border-line last:border-b">
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      aria-expanded={on}
                      className="flex w-full items-start gap-6 py-6 text-left"
                    >
                      <span className={`pt-1.5 text-[13px] font-semibold tracking-[0.2em] transition-colors ${on ? "text-ink" : "text-ink/35"}`}>
                        {s.n}
                      </span>
                      <span className="flex-1">
                        <span className={`block text-[24px] tracking-[-0.02em] transition-colors md:text-[28px] ${on ? "text-ink" : "text-ink/45"}`}>
                          {s.title}
                        </span>
                        <span
                          className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${
                            on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block pt-2 text-[15px] leading-relaxed text-muted">{s.copy}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button onClick={() => add(combo.id)} className="btn btn-ink">
                Get the combo
              </button>
              <span className="text-[15px] text-ink">
                <strong className="font-bold">{formatPrice(combo.price)}</strong>{" "}
                <s className="text-muted">{formatPrice(combo.compareAt!)}</s>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
