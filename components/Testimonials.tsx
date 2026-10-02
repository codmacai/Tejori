import Image from "next/image";
import { getProduct } from "@/lib/products";
import { IconCheck, Stars } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Placeholder reviews — replace with verified customer reviews before launch.
const reviews = [
  {
    title: "My hair fall has reduced",
    quote: "The oil smells lovely and my hair feels thicker and softer after every wash.",
    name: "Anjali R.",
    productId: "neelayamari-hair-oil",
  },
  {
    title: "Finally a clean scalp",
    quote: "Dandruff was a constant battle for me. A few weeks with the shampoo and my scalp feels clean and calm.",
    name: "Rahul M.",
    productId: "neelayamari-anti-dandruff-shampoo",
  },
  {
    title: "Simple, and it works",
    quote: "Oil the night before, wash in the morning. The combo has become my weekend ritual.",
    name: "Sneha K.",
    productId: "anti-dandruff-combo",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="What they say" title="Loved by our community" />
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {reviews.map((r, i) => {
            const p = getProduct(r.productId)!;
            return (
              <Reveal key={r.name} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-[36px] bg-paper p-8 md:p-9">
                  <Stars value={5} className="text-ink [&_svg]:h-4 [&_svg]:w-4" />
                  <blockquote className="mt-6 flex-1">
                    <p className="text-[22px] font-normal leading-snug tracking-[-0.02em] text-ink">“{r.title}”</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.quote}</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{r.name}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-[12.5px] text-muted">
                        <IconCheck className="h-3.5 w-3.5" /> Verified buyer
                      </span>
                    </span>
                    <a href={`#${p.id}`} className="flex items-center gap-2.5" aria-label={`View ${p.name}`}>
                      <span className="hidden text-right text-[12.5px] leading-tight text-muted sm:block">{p.short}</span>
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px]" style={{ background: p.tint }}>
                        <Image src={p.image} alt="" fill sizes="44px" className="object-contain p-1" />
                      </span>
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
