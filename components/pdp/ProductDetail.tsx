"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { COMBO_ID, formatPrice, getProduct, savePct, type Product } from "@/lib/products";
import { IconCheck, IconMinus, IconPlus } from "../Icons";
import { Reveal } from "../Reveal";
import { DetailsAccordion } from "./DetailsAccordion";
import { FeatureBox } from "./FeatureBox";
import { Gallery } from "./Gallery";
import { PairSection } from "./PairSection";


function BuyPanel({ p }: { p: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const save = savePct(p);
  const combo = getProduct(COMBO_ID)!;

  const onAdd = () => {
    add(p.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      {/* sheet grabber (mobile) */}
      <div className="mx-auto mb-6 h-1.5 w-11 rounded-full bg-ink/15 md:hidden" aria-hidden />

      <nav className="hidden text-[13px] text-muted md:block" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#shop" className="hover:text-ink">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{p.short}</span>
      </nav>

      <p className="text-[14px] text-accent-soft md:mt-8">{p.badge?.label}</p>
      <h1 className="heading mt-2 text-[2.4rem] text-ink md:text-[3.4rem]">{p.short}</h1>
      <p className="mt-3 text-[17px] text-muted md:text-[18px]">{p.tagline}</p>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[34px] font-normal leading-none tracking-[-0.02em] text-ink">{formatPrice(p.price)}</span>
        {p.compareAt && <s className="text-[16px] text-muted">MRP {formatPrice(p.compareAt)}</s>}
        {save > 0 && <span className="rounded-full bg-label px-3 py-1 text-[13px] text-ink">Save {save}%</span>}
      </div>
      <p className="mt-2 text-[13px] text-muted">{p.size} · Inclusive of all taxes</p>

      <div id="pdp-buy" className="mt-7 flex gap-3">
        <div className="flex items-center rounded-full bg-cloud">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-14 w-12 place-items-center text-ink">
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-[16px] tabular-nums text-ink" aria-live="polite">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-14 w-12 place-items-center text-ink">
            <IconPlus className="h-4 w-4" />
          </button>
        </div>
        <button onClick={onAdd} className={`btn h-14 flex-1 ${added ? "bg-accent-soft text-white" : "btn-accent"}`}>
          {added ? (
            <>
              <IconCheck className="h-5 w-5" /> Added to bag
            </>
          ) : (
            <span>Add to bag<span className="hidden sm:inline"> · {formatPrice(p.price * qty)}</span></span>
          )}
        </button>
      </div>

      {p.id !== COMBO_ID && (
        <Link
          href={`/products/${COMBO_ID}`}
          className="group mt-4 flex items-center gap-4 rounded-[22px] border border-line p-3 pr-5 transition-colors hover:bg-paper md:hover:bg-white"
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[16px]" style={{ background: combo.tint }}>
            <Image src={combo.image} alt="" fill sizes="56px" className="object-contain p-1" />
          </span>
          <span className="min-w-0 flex-1 leading-snug">
            <span className="block text-[14px] text-ink">Better together: Oil + Shampoo</span>
            <span className="block text-[13px] text-muted">
              {formatPrice(combo.price)} · save {formatPrice(combo.compareAt! - combo.price)}
            </span>
          </span>
          <span className="text-[14px] text-accent-soft transition-transform group-hover:translate-x-1">View ›</span>
        </Link>
      )}

      <DetailsAccordion product={p} />
    </div>
  );
}

/** Mobile buy bar that appears once the main Add to bag button scrolls away. */
function MobileBuyBar({ p }: { p: Product }) {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("pdp-buy");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setShow(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 transition-all duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-[28px] bg-white p-2 shadow-[0_20px_50px_-15px_rgba(31,47,49,.45)] ring-1 ring-line">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px]" style={{ background: p.tint }}>
          <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] text-ink">{p.short}</p>
          <p className="text-[14px] text-ink">{formatPrice(p.price)}</p>
        </div>
        <button onClick={() => add(p.id)} className="h-11 rounded-full bg-accent px-5 text-[14px] text-white">
          Add to bag
        </button>
      </div>
    </div>
  );
}

export function ProductDetail({ product: p }: { product: Product }) {
  const d = p.details;
  const save = savePct(p);
  const howImage = d.gallery.find((g) => g.fit === "cover") ?? d.gallery[0];

  return (
    <>
      {/* ───────── Hero: gallery + details ───────── */}
      <div className="pt-[100px] md:pt-[124px]">
        <div className="mx-auto max-w-[1440px] md:grid md:grid-cols-2 md:items-start md:gap-12 md:px-10 lg:gap-20">
          <div className="sticky top-16 z-0 px-3 md:top-24 md:px-0">
            <Gallery images={d.gallery} tint={p.tint} saveLabel={save ? `Save ${save}%` : undefined} />
          </div>

          <div className="relative z-10 -mt-10 rounded-t-[32px] bg-white px-5 pb-12 pt-3 shadow-[0_-20px_40px_-24px_rgba(31,47,49,.35)] md:mt-0 md:rounded-none md:bg-transparent md:px-0 md:pb-0 md:pt-2 md:shadow-none">
            <BuyPanel p={p} />
          </div>
        </div>
      </div>

      {/* sections sit on an opaque layer so the sticky image never shows through */}
      <div className="relative z-10 bg-paper">
        {/* ───────── Why choose ───────── */}
        <FeatureBox product={p} />

        {/* ───────── How to use ───────── */}
        <section className="pt-20 md:pt-32">
          <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[40px] md:order-2" >
              <div className="absolute inset-0" style={{ background: p.tint }} />
              <Image
                src={howImage.src}
                alt={howImage.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={howImage.fit === "contain" ? "object-contain p-[14%]" : "object-cover"}
                style={{ objectPosition: howImage.focus }}
              />
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow text-muted">How to use</p>
                <h2 className="heading mt-4 text-[2.4rem] text-ink md:text-[3.5rem]">Three simple steps</h2>
              </Reveal>
              <ol className="relative mt-10">
                <span className="absolute bottom-8 left-[27px] top-8 w-px bg-line" aria-hidden />
                {d.howTo.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-6 pb-10 last:pb-0">
                    <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-[16px] text-white">
                      0{i + 1}
                    </span>
                    <span className="pt-2">
                      <span className="block text-[22px] font-normal tracking-[-0.015em] text-ink">{s.title}</span>
                      <span className="mt-1.5 block max-w-md text-[15.5px] leading-relaxed text-muted">{s.copy}</span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───────── Ingredients ───────── */}
        <section className="pt-20 md:pt-32">
          <div className="container-x">
            <div className="stage relative overflow-hidden rounded-[40px] px-6 py-14 text-white md:px-14 md:py-20">
              <span aria-hidden className="pointer-events-none absolute -bottom-10 right-0 select-none font-logo text-[22vw] font-bold leading-none tracking-[-0.06em] text-white/[0.035]">
                Tejori
              </span>
              <Reveal className="relative max-w-2xl">
                <p className="eyebrow text-white/60">Ingredients</p>
                <h2 className="heading mt-4 text-[2.4rem] md:text-[3.5rem]">What’s inside</h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">
                  Simple, recognisable ingredients — chosen for what they do for your scalp and hair.
                </p>
              </Reveal>
              <div className="relative mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
                {d.ingredients.map((ing, i) => (
                  <Reveal key={ing.name} delay={i * 80} className="overflow-hidden rounded-[28px] bg-white/[0.07] p-2.5 ring-1 ring-white/10 backdrop-blur-sm">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                      <Image src={ing.image} alt={ing.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] hover:scale-[1.05]" />
                    </div>
                    <div className="px-4 pb-5 pt-6 md:px-5">
                    <h3 className="text-[24px] font-normal tracking-[-0.015em]">{ing.name}</h3>
                    {ing.latin && <p className="mt-0.5 text-[14px] text-white/55">{ing.latin}</p>}
                    <p className="mt-4 text-[15px] leading-relaxed text-white/75">{ing.copy}</p>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={d.ingredients.length * 80} className="flex flex-col justify-end rounded-[28px] border border-dashed border-white/20 p-7 md:p-8">
                  <p className="text-[15px] leading-relaxed text-white/65">
                    The full ingredient list is printed on the pack. Always patch-test before first use.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Pair it with ───────── */}
        <PairSection product={p} />
      </div>

      <MobileBuyBar p={p} />
    </>
  );
}
