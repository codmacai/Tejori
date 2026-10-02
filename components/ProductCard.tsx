"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";
import { Bottle } from "./Bottle";
import { IconCheck, IconHeart, IconPlus, Stars } from "./Icons";

const isDark = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 110;
};

const chipSpots = [
  "left-[8%] top-[34%]",
  "right-[7%] top-[24%]",
  "right-[10%] top-[52%]",
];

export function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [sizeIdx, setSizeIdx] = useState(p.sizes.length - 1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const size = p.sizes[sizeIdx];
  const dark = isDark(p.palette.stage);
  const save = size.compareAt
    ? Math.round(((size.compareAt - size.price) / size.compareAt) * 100)
    : 0;

  const onAdd = () => {
    add(p.id, size.label, size.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="product-card group flex h-full w-full flex-col">
      {/* Stage */}
      <div
        className="grain relative aspect-[4/5] overflow-hidden rounded-[28px]"
        style={{
          background: `radial-gradient(120% 90% at 50% 100%, ${p.palette.stageDeep} 0%, ${p.palette.stage} 62%)`,
        }}
      >
        {/* oversized step numeral */}
        <span
          className={`serif-accent pointer-events-none absolute -right-2 -top-6 select-none text-[11rem] leading-none ${
            dark ? "text-bone/[0.07]" : "text-ink/[0.07]"
          }`}
          aria-hidden
        >
          {p.step.n}
        </span>

        {/* rotating ring */}
        <svg
          className={`stage-ring absolute left-1/2 top-[46%] h-[78%] -translate-x-1/2 -translate-y-1/2 ${
            dark ? "text-bone/25" : "text-ink/20"
          }`}
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 5" />
          <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="4" r="3" fill="currentColor" />
        </svg>

        {/* vertical step label */}
        <span
          className={`eyebrow absolute left-5 top-[64%] origin-top-left -rotate-90 whitespace-nowrap text-[10px] ${
            dark ? "text-bone/60" : "text-ink/55"
          }`}
        >
          Step {p.step.n} — {p.step.name}
        </span>

        {/* top row */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between">
          {p.badge ? (
            <span
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide ${
                dark ? "bg-bone text-ink-deep" : "bg-ink text-bone"
              }`}
            >
              {p.badge}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className={`grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${
              dark ? "bg-bone/15 text-bone hover:bg-bone/25" : "bg-white/50 text-ink hover:bg-white/80"
            }`}
          >
            <IconHeart
              className={`h-[18px] w-[18px] transition-transform ${liked ? "scale-110 fill-current text-copper" : ""}`}
            />
          </button>
        </div>

        {/* ingredient chips (revealed on hover) */}
        {p.heroIngredients.map((ing, i) => (
          <span
            key={ing}
            className={`chip-float absolute z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-sm backdrop-blur ${chipSpots[i]} ${
              dark ? "bg-bone/90 text-ink-deep" : "bg-white/80 text-ink-deep"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            + {ing}
          </span>
        ))}

        {/* bottle */}
        <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center">
          <div className="bottle-wrap w-[48%]">
            <Bottle
              shape={p.shape}
              {...p.palette}
              name={p.label}
              size={size.label}
              className="w-full drop-shadow-[0_24px_24px_rgba(27,42,44,.28)]"
            />
          </div>
          <div className="bottle-shadow -mt-3 h-4 w-[46%] rounded-[50%] bg-ink-deep/30 blur-md" />
        </div>

        {/* result + quick add */}
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between">
          <div
            className={`rounded-2xl px-3.5 py-2.5 backdrop-blur-md ${
              dark ? "bg-bone/10 text-bone" : "bg-white/55 text-ink-deep"
            }`}
          >
            <p className="display text-2xl leading-none">{p.result.value}</p>
            <p className="mt-1 text-[11px] opacity-70">{p.result.copy}</p>
          </div>
          <button
            onClick={onAdd}
            aria-label={`Quick add ${p.name}, ${size.label}`}
            className={`flex h-12 items-center overflow-hidden rounded-full pl-3.5 pr-3.5 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:pr-5 ${
              dark ? "bg-bone text-ink-deep" : "bg-ink text-bone"
            }`}
          >
            {added ? (
              <IconCheck className="h-5 w-5 animate-[pop_.4s_ease-out]" />
            ) : (
              <IconPlus className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
            )}
            <span className="max-w-0 whitespace-nowrap text-[13px] font-semibold opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:ml-2 group-hover:max-w-28 group-hover:opacity-100">
              {added ? "Added" : "Quick add"}
            </span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-center justify-between text-[12px]">
          <span className="rounded-full border border-line px-2.5 py-1 font-medium text-ink">
            For {p.concern.toLowerCase()}
          </span>
          <span className="flex items-center gap-1.5 text-copper">
            <Stars value={p.rating} />
            <span className="font-semibold text-ink-deep">{p.rating}</span>
            <span className="text-ink-deep/50">({p.reviews.toLocaleString("en-IN")})</span>
          </span>
        </div>

        <h3 className="mt-3 display-sm text-[1.38rem] text-ink-deep">{p.name}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-deep/65">{p.tagline}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Size">
            {p.sizes.map((s, i) => (
              <button
                key={s.label}
                role="radio"
                aria-checked={i === sizeIdx}
                onClick={() => setSizeIdx(i)}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                  i === sizeIdx
                    ? "bg-ink-deep text-bone"
                    : "text-ink-deep/70 shadow-[inset_0_0_0_1px_var(--color-line)] hover:text-ink-deep"
                }`}
              >
                {s.label}
              </button>
            ))}
            {save > 0 && (
              <span className="ml-auto text-[12px] font-semibold text-copper">Save {save}%</span>
            )}
          </div>

          <button
            onClick={onAdd}
            className={`mt-4 flex h-[3.25rem] w-full items-center justify-between rounded-full pl-6 pr-2 text-[14px] font-semibold transition-all duration-500 ease-[var(--ease-out-expo)] ${
              added ? "bg-copper text-bone" : "bg-ink text-bone hover:bg-ink-deep"
            }`}
          >
            <span>{added ? "Added to bag" : "Add to bag"}</span>
            <span className="flex items-center gap-2 rounded-full bg-bone/10 px-4 py-2">
              {size.compareAt && (
                <s className="text-[12px] font-normal opacity-60">{formatPrice(size.compareAt)}</s>
              )}
              {formatPrice(size.price)}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
