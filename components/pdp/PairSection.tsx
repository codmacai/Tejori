"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { COMBO_ID, formatPrice, getProduct, type Product } from "@/lib/products";
import { IconArrow, IconCheck, IconPlus } from "../Icons";
import { Reveal } from "../Reveal";

function Half({
  p,
  role,
  summary,
  points,
  chip,
  dark,
  link,
}: {
  p: Product;
  role: string;
  summary: string;
  points: string[];
  chip: string;
  dark?: boolean;
  link?: boolean;
}) {
  return (
    <div className={`relative flex flex-col items-center px-6 pb-12 pt-10 text-center md:px-14 md:pb-14 md:pt-12 ${dark ? "stage text-white" : "bg-white text-ink"}`}>
      <span className={`absolute left-5 top-5 rounded-full px-3 py-1.5 text-[12px] ${dark ? "bg-white/10 text-white/80" : "bg-cloud text-muted"}`}>{chip}</span>

      <div className="relative mt-6 aspect-square w-48 overflow-hidden rounded-[28px] md:w-56" style={{ background: p.tint }}>
        <Image src={p.image} alt={p.name} fill sizes="224px" className="object-contain p-5" />
      </div>

      <h3 className="mt-8 text-[30px] font-normal tracking-[-0.02em] md:text-[34px]">{role}</h3>
      <p className={`mt-2 max-w-sm text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{summary}</p>

      <div className={`my-8 h-px w-full max-w-md ${dark ? "bg-white/15" : "bg-line"}`} />

      <ul className="w-full max-w-md space-y-4 text-left">
        {points.map((pt) => (
          <li key={pt} className="flex items-center gap-3.5 text-[16px]">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
              <IconCheck className="h-4 w-4" />
            </span>
            {pt}
          </li>
        ))}
      </ul>

      {link && (
        <Link href={`/products/${p.id}`} className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:underline">
          View {p.short} <IconArrow className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** "People usually pair it with" — split card, or "What's inside" for the combo. */
export function PairSection({ product }: { product: Product }) {
  const { add } = useCart();
  const combo = getProduct(COMBO_ID)!;
  const isCombo = product.id === COMBO_ID;

  const left = isCombo ? getProduct("neelayamari-hair-oil")! : product;
  const right = isCombo ? getProduct("neelayamari-anti-dandruff-shampoo")! : getProduct(product.details.pairWith!)!;
  const separately = left.price + right.price;

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted">{isCombo ? "Inside the box" : "Better together"}</p>
          <h2 className="heading mt-4 text-[2.4rem] text-ink md:text-[3.5rem]">
            {isCombo ? "What’s inside" : "People usually pair it with"}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-[1200px] overflow-hidden rounded-[40px] bg-white shadow-[0_40px_80px_-40px_rgba(31,47,49,.35)] md:mt-16">
          <div className="relative grid md:grid-cols-2">
            <Half
              p={left}
              role={left.details.pair.role}
              summary={left.details.pair.summary}
              points={left.details.pair.points}
              chip={isCombo ? "Step 1" : "You’re viewing"}
              dark
            />
            <div className="relative">
              <span className="absolute left-1/2 top-0 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_12px_30px_-10px_rgba(31,47,49,.45)] md:left-0 md:top-[200px] md:h-[72px] md:w-[72px]">
                <IconPlus className="h-6 w-6" />
              </span>
              <Half
                p={right}
                role={right.details.pair.role}
                summary={right.details.pair.summary}
                points={right.details.pair.points}
                chip={isCombo ? "Step 2" : "Pairs with"}
                link={!isCombo}
              />
            </div>
          </div>

          {/* bundle strip */}
          <div className="flex flex-col items-start gap-5 border-t border-line bg-paper px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[18px]" style={{ background: combo.tint }}>
                <Image src={combo.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
              </div>
              <div>
                <p className="text-[15px] leading-snug text-ink md:text-[16px]">{isCombo ? "Both, in one box" : "Get both in the Anti-Dandruff Combo"}</p>
                <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 whitespace-nowrap">
                  <span className="text-[22px] font-normal tracking-[-0.01em] text-ink">{formatPrice(combo.price)}</span>
                  <s className="text-[14px] text-muted">{formatPrice(separately)}</s>
                  <span className="text-[14px] text-accent-soft">Save {formatPrice(separately - combo.price)}</span>
                </p>
              </div>
            </div>
            <div className="flex w-full gap-3 md:w-auto">
              {!isCombo && (
                <Link href={`/products/${COMBO_ID}`} className="btn btn-outline h-12 flex-1 md:flex-none">
                  View combo
                </Link>
              )}
              <button onClick={() => add(COMBO_ID)} className="btn btn-accent h-12 flex-1 md:flex-none">
                Add combo to bag
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
